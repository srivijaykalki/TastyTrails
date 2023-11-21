/**
 * @fileoverview
 * Defines functions to interact with the community model for CRUD operations.
 */

import CommunityModel from "../models/community.js";

/**
 * Retrieves all communities based on the provided parameters.
 *
 * @async
 * @function
 * @param {Object} [params={}] - Parameters to filter posts.
 * @returns {Promise<Array>} - A promise that resolves to an array of communities.
 * @throws {Error} - Throws an error if there is an issue fetching communities.
 */
export const getCommunities = async (params = {}) => {
  try {
    const communities = await CommunityModel.find(params).exec();
    return communities;
  } catch (error) {
    throw new Error("Error fetching communities");
  }
};

/**
 * Adds a new community to the database.
 *
 * @async
 * @function
 * @param {Object} newCommunityData - Data for the new community.
 * @returns {Promise<Object>} - A promise that resolves to the newly created community.
 * @throws {Error} - Throws an error if there is an issue creating the community.
 */

export const addNewCommunity = async (newCommunityData) => {
  try {
    const newCommunity = await CommunityModel.create(newCommunityData);
    return newCommunity;
  } catch (error) {
    throw new Error("Error creating community");
  }
};

/**
 * Retrieves a community by its ID.
 *
 * @async
 * @function
 * @param {string} communityId - ID of the community to retrieve.
 * @returns {Promise<Object>} - A promise that resolves to the retrieved community.
 * @throws {Error} - Throws an error if the community with the specified ID is not found or there is an issue fetching it.
 */

export const getCommunityById = async (communityId) => {
  try {
    const communtiy = await CommunityModel.findById(communityId);
    if (!communtiy) {
      throw new Error("community is not found");
    }
    return communtiy;
  } catch (error) {
    throw new Error("Error fetching community by ID");
  }
};

/**
 * Updates a community by its ID.
 *
 * @async
 * @function
 * @param {string} communityId - ID of the community to update.
 * @param {Object} communityData - Data to update the community.
 * @returns {Promise<Object>} - A promise that resolves to the updated community.
 * @throws {Error} - Throws an error if there is an issue updating the community or if the community with the specified ID is not found.
 */

export const updateCommunityById = async (communityId, communityData) => {
  try {
    const communtiy = await CommunityModel.findByIdAndUpdate(
      communityId,
      communityData
    );
    return communtiy;
  } catch (error) {
    throw new Error("Error updating community by ID");
  }
};
