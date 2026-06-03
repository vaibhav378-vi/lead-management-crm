const express = require("express");

const {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
  searchLeads,
} = require("../controllers/leadController");

const router = express.Router();

router.get("/search", searchLeads);

router.route("/")
  .get(getLeads)
  .post(createLead);

router.route("/:id")
  .get(getLeadById)
  .put(updateLead)
  .delete(deleteLead);

module.exports = router;