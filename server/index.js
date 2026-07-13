const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

/* ===========================
   Middleware
=========================== */

app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://rentora-psi-azure.vercel.app",
        ],
        credentials: true,
    })
);

app.use(express.json());

app.use(cookieParser());

/* ===========================
   JWT Verify Middleware
=========================== */

const verifyToken = (req, res, next) => {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).send({
            success: false,
            message: "Unauthorized Access",
        });
    }

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    success: false,
                    message: "Invalid Token",
                });
            }

            req.user = decoded;

            next();
        }
    );
};

/* ===========================
   MongoDB Connection
=========================== */

const username = encodeURIComponent(process.env.DB_USER);

const password = encodeURIComponent(process.env.DB_PASS);

const uri = `mongodb://${username}:${password}@assignment-shard-00-00.wnlkn.mongodb.net:27017,assignment-shard-00-01.wnlkn.mongodb.net:27017,assignment-shard-00-02.wnlkn.mongodb.net:27017/?ssl=true&replicaSet=atlas-142bi7-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Assignment`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

async function run() {
    try {
        console.log("🚀 Starting MongoDB Connection...");

        /* ===========================
           Connect MongoDB
        =========================== */

        await client.connect();

        console.log("✅ MongoDB Connected!");

        await client.db("admin").command({
            ping: 1,
        });

        console.log("✅ MongoDB Ping Success!");

        /* ===========================
           Collections
        =========================== */

        const carsCollection = client
            .db("Car_Rental_System")
            .collection("cars");

        const bookingsCollection = client
            .db("Car_Rental_System")
            .collection("bookings");

        const faqCollection = client
            .db("Car_Rental_System")
            .collection("faq");

        const reviewsCollection = client
            .db("Car_Rental_System")
            .collection("reviews");

        /* ===========================
           JWT APIs
        =========================== */

        app.post("/jwt", (req, res) => {
            const user = req.body;

            const token = jwt.sign(
                { email: user.email },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "7d" }
            );

            res
                .cookie("token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite:
                        process.env.NODE_ENV === "production"
                            ? "none"
                            : "strict",
                })
                .send({
                    success: true,
                });
        });

        app.post("/logout", (req, res) => {
            res
                .clearCookie("token", {
                    httpOnly: true,
                    secure:
                        process.env.NODE_ENV === "production",
                    sameSite:
                        process.env.NODE_ENV === "production"
                            ? "none"
                            : "strict",
                })
                .send({
                    success: true,
                });
        });

        /* ===========================
           Cars APIs
        =========================== */

        // Get All Cars / My Cars

        
        app.get("/cars", async (req, res) => {
            try {
                const email = req.query.email;
                const limit = parseInt(req.query.limit);

                // My Cars
                if (email) {
                    const token = req.cookies?.token;

                    if (!token) {
                        return res.status(401).send({
                            success: false,
                            message: "Unauthorized Access",
                        });
                    }

                    const decoded = jwt.verify(
                        token,
                        process.env.ACCESS_TOKEN_SECRET
                    );

                    if (decoded.email !== email) {
                        return res.status(403).send({
                            success: false,
                            message: "Forbidden Access",
                        });
                    }

                    const result = await carsCollection
                        .find({ hr_email: email })
                        .sort({ posted: -1 })
                        .toArray();

                    return res.send(result);
                }

                // Public Cars
                let cursor = carsCollection.find({}).sort({ posted: -1 });

                if (!isNaN(limit)) {
                    cursor = cursor.limit(limit);
                }

                const result = await cursor.toArray();

                res.send(result);

            } catch (error) {
                console.log(error);

                res.status(500).send({
                    success: false,
                    message: "Failed to load cars.",
                });
            }
        });

        /* ===========================
            Featured Cars
        =========================== */

        app.get("/cars/featured", async (req, res) => {
            try {
                const cars = await carsCollection
                    .find({ featured: true })
                    .limit(6)
                    .toArray();

                res.send({
                    success: true,
                    data: cars,
                });
            } catch (err) {
                res.status(500).send({
                    success: false,
                    message: "Failed to fetch featured cars",
                });
            }
        });

        // Get Single Car

        app.get("/cars/:id", async (req, res) => {

            const id = req.params.id;

            if (!ObjectId.isValid(id)) {
                return res.status(400).send({
                    success: false,
                    message: "Invalid Car ID",
                });
            }

            const result = await carsCollection.findOne({
                _id: new ObjectId(id),
            });

            res.send(result);

        });

        // Add Car

        app.post("/cars", verifyToken, async (req, res) => {
            try {
                const car = req.body;

                car.hr_email = req.user.email;

                const result = await carsCollection.insertOne(car);

                res.send(result);

            } catch (error) {

                console.log(error);

                res.status(500).send({
                    success: false,
                    message: "Failed to add car",
                });

            }
        });


        /* ===========================
           Booking APIs
        =========================== */

        // Book a Car

        app.post("/bookings", verifyToken, async (req, res) => {
            try {
                const booking = req.body;

                booking.hr_email = req.user.email;

                // Check if the car exists
                const car = await carsCollection.findOne({
                    _id: new ObjectId(booking.carId),
                });

                if (!car) {
                    return res.status(404).send({
                        success: false,
                        message: "Car not found.",
                    });
                }

                // Prevent booking unavailable cars
                if (!car.available) {
                    return res.status(400).send({
                        success: false,
                        message: "This car is currently unavailable.",
                    });
                }

                // Prevent booking own car
                if (car.hr_email === booking.hr_email) {
                    return res.status(400).send({
                        success: false,
                        message: "You cannot book your own car.",
                    });
                }

                // Prevent duplicate active booking
                const alreadyBooked = await bookingsCollection.findOne({
                    carId: booking.carId,
                    hr_email: booking.hr_email,
                    status: { $ne: "Canceled" },
                });

                if (alreadyBooked) {
                    return res.status(400).send({
                        success: false,
                        message: "You have already booked this car.",
                    });
                }

                booking.status = "Confirmed";
                booking.createdAt = new Date();

                const result = await bookingsCollection.insertOne(booking);

                // Make car unavailable
                await carsCollection.updateOne(
                    {
                        _id: new ObjectId(booking.carId),
                    },
                    {
                        $set: {
                            available: false,
                        },
                    }
                );

                res.send({
                    success: true,
                    insertedId: result.insertedId,
                    message: "Booking Successful",
                });
            } catch (error) {
                console.log(error);

                res.status(500).send({
                    success: false,
                    message: "Booking failed.",
                });
            }
        });

        // Get My Bookings

        app.get("/bookings", verifyToken, async (req, res) => {
            try {
                const email = req.query.email;

                if (email && email !== req.user.email) {
                    return res.status(403).send({
                        success: false,
                        message: "Forbidden Access",
                    });
                }

                const query = email
                    ? { hr_email: email }
                    : {};

                const result = await bookingsCollection
                    .find(query)
                    .sort({ createdAt: -1 })
                    .toArray();

                res.send(result);

            } catch (error) {
                console.log(error);

                res.status(500).send({
                    success: false,
                    message: "Failed to load bookings.",
                });
            }
        });

        // Update Booking

        app.patch("/bookings/:id", verifyToken, async (req, res) => {
            try {
                const id = req.params.id;

                const updatedData = req.body;

                const booking = await bookingsCollection.findOne({
                    _id: new ObjectId(id),
                });

                if (!booking) {
                    return res.status(404).send({
                        success: false,
                        message: "Booking not found",
                    });
                }

                if (booking.hr_email !== req.user.email) {
                    return res.status(403).send({
                        success: false,
                        message: "Forbidden Access",
                    });
                }

                await bookingsCollection.updateOne(
                    {
                        _id: new ObjectId(id),
                    },
                    {
                        $set: updatedData,
                    }
                );

                // If booking canceled, make car available again
                if (updatedData.status === "Canceled") {
                    await carsCollection.updateOne(
                        {
                            _id: new ObjectId(booking.carId),
                        },
                        {
                            $set: {
                                available: true,
                            },
                        }
                    );
                }

                res.send({
                    success: true,
                    message: "Booking updated successfully.",
                });
            } catch (error) {
                console.log(error);

                res.status(500).send({
                    success: false,
                    message: "Failed to update booking.",
                });
            }
        });

        // Delete Booking

        app.delete("/bookings/:id", verifyToken, async (req, res) => {
            try {
                const id = req.params.id;

                const booking = await bookingsCollection.findOne({
                    _id: new ObjectId(id),
                });

                if (!booking) {
                    return res.status(404).send({
                        success: false,
                        message: "Booking not found",
                    });
                }

                if (booking.hr_email !== req.user.email) {
                    return res.status(403).send({
                        success: false,
                        message: "Forbidden Access",
                    });
                }

                await bookingsCollection.deleteOne({
                    _id: new ObjectId(id),
                });

                // Make car available again
                await carsCollection.updateOne(
                    {
                        _id: new ObjectId(booking.carId),
                    },
                    {
                        $set: {
                            available: true,
                        },
                    }
                );

                res.send({
                    success: true,
                    message: "Booking deleted successfully.",
                });
            } catch (error) {
                console.log(error);

                res.status(500).send({
                    success: false,
                    message: "Failed to delete booking.",
                });
            }
        });

        /* ===========================
           Update Car
        =========================== */

        app.put("/cars/:id", verifyToken, async (req, res) => {
            try {
                const id = req.params.id;

                const existingCar = await carsCollection.findOne({
                    _id: new ObjectId(id),
                });

                if (!existingCar) {
                    return res.status(404).send({
                        success: false,
                        message: "Car not found.",
                    });
                }

                // Owner Check
                if (existingCar.hr_email !== req.user.email) {
                    return res.status(403).send({
                        success: false,
                        message: "Forbidden Access",
                    });
                }

                const updatedCar = req.body;

                const result = await carsCollection.updateOne(
                    {
                        _id: new ObjectId(id),
                    },
                    {
                        $set: {
                            model: updatedCar.model,
                            brand: updatedCar.brand,
                            price: Number(updatedCar.price),

                            available:
                                updatedCar.available ??
                                existingCar.available,

                            registrationNumber:
                                updatedCar.registrationNumber,

                            features: updatedCar.features,

                            description: updatedCar.description,

                            image: updatedCar.image,

                            location: updatedCar.location,
                        },
                    }
                );

                if (result.matchedCount === 0) {
                    return res.status(404).send({
                        success: false,
                        message: "Car not found.",
                    });
                }

                res.send({
                    success: true,
                    modifiedCount: result.modifiedCount,
                    message: "Car updated successfully.",
                });
            } catch (error) {
                console.log(error);

                res.status(500).send({
                    success: false,
                    message: "Failed to update car.",
                });
            }
        });

        /* ===========================
           Delete Car
        =========================== */

        app.delete("/cars/:id", verifyToken, async (req, res) => {
            try {
                const id = req.params.id;

                const existingCar = await carsCollection.findOne({
                    _id: new ObjectId(id),
                });

                if (!existingCar) {
                    return res.status(404).send({
                        success: false,
                        message: "Car not found",
                    });
                }

                // Owner Check
                if (existingCar.hr_email !== req.user.email) {
                    return res.status(403).send({
                        success: false,
                        message: "Forbidden Access",
                    });
                }

                // Check if car exists
                const car = await carsCollection.findOne({
                    _id: new ObjectId(id),
                });

                if (!car) {
                    return res.status(404).send({
                        success: false,
                        message: "Car not found.",
                    });
                }

                // Prevent deleting booked car
                const activeBooking =
                    await bookingsCollection.findOne({
                        carId: id,
                        status: {
                            $ne: "Canceled",
                        },
                    });

                if (activeBooking) {
                    return res.status(400).send({
                        success: false,
                        message:
                            "This car has an active booking. Cancel the booking first.",
                    });
                }

                const result =
                    await carsCollection.deleteOne({
                        _id: new ObjectId(id),
                    });

                res.send({
                    success: true,
                    deletedCount: result.deletedCount,
                    message: "Car deleted successfully.",
                });
            } catch (error) {
                console.log(error);

                res.status(500).send({
                    success: false,
                    message: "Failed to delete car.",
                });
            }
        });

        // /* ===========================
        //     Brands
        // =========================== */

        // app.get("/cars/brands", async (req, res) => {
        //     try {

        //         const brands = await carsCollection.distinct("brand");

        //         res.send({
        //             success: true,
        //             data: brands.sort(),
        //         });

        //     } catch (error) {

        //         console.error(error);

        //         res.status(500).send({
        //             success: false,
        //             message: "Failed to fetch brands",
        //         });

        //     }
        // });


        /* ===========================
            Reviews/Testimonials
        =========================== */

        app.get("/reviews", async (req, res) => {
            try {

                const limit = parseInt(req.query.limit) || 6;

                const reviews = await reviewsCollection
                    .find({})
                    .sort({ createdAt: -1 })
                    .limit(limit)
                    .toArray();

                res.send({
                    success: true,
                    data: reviews,
                });

            } catch (error) {

                console.log(error);

                res.status(500).send({
                    success: false,
                    message: "Failed to fetch reviews.",
                });

            }
        });


        /* ===========================
            FAQ
        =========================== */

        // app.get("/faq", async (req, res) => {

        //     try {

        //         const faq = await faqCollection
        //             .find({})
        //             .sort({ order: 1 })
        //             .toArray();

        //         res.send({
        //             success: true,
        //             data: faq
        //         });

        //     } catch (error) {

        //         console.log(error);

        //         res.status(500).send({
        //             success: false,
        //             message: "Failed to fetch FAQs."
        //         });

        //     }

        // });

        /* ===========================
           Server Connected
        =========================== */

        console.log("Car Rental API Ready");
    } catch (error) {
        console.error("❌ MongoDB Error:", error);
    }
}

run();

/* ===========================
   Home Route
=========================== */

app.get("/", (req, res) => {
    res.send({
        success: true,
        message: "Car Rental Server Running Successfully",
    });
});

/* ===========================
   Health Check
=========================== */

app.get("/health", (req, res) => {
    res.send({
        success: true,
        status: "Server Healthy",
    });
});

/* ===========================
   Start Server
=========================== */

app.listen(port, () => {
    console.log(
        `Server Running at http://localhost:${port}`
    );
});