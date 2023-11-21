/**
 * @fileoverview Contains Express route handlers for community API endpoints.
 */

import * as CommunityService from "../services/community-service.js";
import * as responses from "../controllers/response-handler.js";

/**
 * Handles the retrieval of all posts.
 *
 * @async
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export const getCommunities = async (req, res) => {
  try {
    const communityData = req.body;
    const communities = await CommunityService.getCommunities(communityData);
    responses.setResponse(communities, res);
  } catch (err) {
    res.status(500).json({
      code: "500",
      message: "Internal Server Error.",
    });
  }
};

export const addNewCommunity = async (req, res) => {
  try {
    const communityData = req.body;
    const community = await CommunityService.addNewCommunity(communityData);
    res.status(201).json(community);
  } catch (err) {
    responses.set400ErrorResponse(err, res);
  }
};

export const getCommunityById = async (req, res) => {
  const communityId = req.params.id;
  try {
    const community = await CommunityService.getCommunityById(communityId);
    responses.setResponse(community, res);
  } catch (err) {
    responses.set404ErrorResponse(err, res);
  }
};
