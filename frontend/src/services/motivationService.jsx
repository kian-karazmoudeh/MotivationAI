import api from "./api";

/**
 * Motivation service for handling motivation-related API calls
 */
const motivationService = {
  /**
   * Get motivation based on mood
   * @param {string} mood - User's current mood
   * @returns {Promise} Promise with motivation data
   */
  getMotivation: async (mood) => {
    return api.get(`/motivate/${mood}`);
  },

  /**
   * Get personalized motivation based on user profile and mood
   * @param {string} mood - User's current mood
   * @returns {Promise} Promise with personalized motivation data
   */
  getPersonalizedMotivation: async (mood) => {
    return api.get(`/motivate/personalized/${mood}`);
  },
};

export default motivationService;
