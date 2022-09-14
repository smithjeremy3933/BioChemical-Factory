const express = require("express");
const requireAuth = require("../middlewares/requireAuth");
const GroupController = require("../controllers/groupController");
const router = express.Router();

router.use(requireAuth);

router.post("/api/groups/create", GroupController.createGroup);

router.get("/api/groups/group/addMember/:groupID/:newMemberID", GroupController.addGroupMemberByGroupID);

router.get("/api/groups/allGroups", GroupController.getAllGroups);

router.get("/api/groups/getGroup/:id", GroupController.getOneGroupByID)

module.exports = router;