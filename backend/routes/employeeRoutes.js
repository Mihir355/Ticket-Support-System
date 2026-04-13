const express = require("express");
const router = express.Router();
const Ticket = require("../models/ticketCreate");

// Add query parameters for pagination: page and limit
const mongoose = require("mongoose");

router.get("/:userId/tickets", async (req, res) => {
  try {
    const userId = req.params.userId;
    const page = parseInt(req.query.page) || 1;
    const sortType = req.query.sort || "created"; // default
    const limit = 5;
    const skip = (page - 1) * limit;

    const totalTickets = await Ticket.countDocuments({ assignedTo: userId });

    let tickets;

    // 👉 SORT BY STATUS
    if (sortType === "status") {
      tickets = await Ticket.aggregate([
        {
          $match: { assignedTo: new mongoose.Types.ObjectId(userId) },
        },
        {
          $addFields: {
            statusPriority: {
              $switch: {
                branches: [
                  { case: { $eq: ["$currentstatus", "open"] }, then: 1 },
                  { case: { $eq: ["$currentstatus", "in progress"] }, then: 2 },
                  { case: { $eq: ["$currentstatus", "closed"] }, then: 3 },
                ],
                default: 4,
              },
            },
          },
        },
        {
          $sort: {
            statusPriority: 1,
            createdAt: -1,
          },
        },
        { $skip: skip },
        { $limit: limit },
      ]);
    }
    // 👉 SORT BY CREATED DATE (DEFAULT)
    else {
      tickets = await Ticket.find({ assignedTo: userId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
    }

    res.status(200).json({
      tickets,
      totalPages: Math.ceil(totalTickets / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching employee tickets", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
