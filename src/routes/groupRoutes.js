const express = require("express");
const requireAuth = require("../middlewares/requireAuth");
const GroupController = require("../controllers/groupController");
const GroupChatController = require("../controllers/groupChatController");
const router = express.Router();

router.use(requireAuth);

router.post("/api/groups/create", GroupController.createGroup);

router.post("/api/groups/group/addMember/:groupID/:newMemberID", GroupController.addGroupMemberByGroupID);

router.get("/api/groups/allGroups", GroupController.getAllGroups);

router.get("/api/groups/getGroup/:id", GroupController.getOneGroupByID)

////////////////////////////////////////////////////

router.post("/api/groups/group/createPost/:groupID", GroupChatController.createGroupChatPost);

router.post("/api/groups/group/createComment/:postID", GroupChatController.createGroupChatComment);

router.delete("/api/groups/group/deleteComment/:id", GroupChatController.deleteGroupChatComment);

module.exports = router;