const express = require("express");
const router = express.Router();
const Ticket = require("../models/ticketCreate");

// Add query parameters for pagination: page and limit
router.get("/:userId/tickets", async (req, res) => {
  try {
    const userId = req.params.userId;
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    const totalTickets = await Ticket.countDocuments({ assignedTo: userId });
    const tickets = await Ticket.find({ assignedTo: userId })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

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
