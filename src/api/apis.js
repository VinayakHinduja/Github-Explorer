import axios from "axios";

export const fetchRepositories = async (query, page = 1, perPage = 30) => {
  if (!query.trim()) {
    throw new Error("Query cannot be empty.");
  }

  try {
    const response = await axios.get(
      `https://api.github.com/search/repositories?q=${query}&page=${page}&per_page=${perPage}`
    );

    if (response.status === 200) {
      return response.data.items || [];
    } else {
      throw new Error(response.data.message || "Something went wrong!");
    }
  } catch (error) {
    throw new Error("Failed to fetch data. Please check your connection.");
  }
};

export const fetchContributors = async (contributorsUrl) => {
  if (!contributorsUrl) {
    throw new Error("Contributors URL cannot be empty.");
  }

  try {
    const response = await axios.get(contributorsUrl);

    if (response.status === 200) {
      return response.data || [];
    } else {
      throw new Error(response.data.message || "Failed to fetch contributors!");
    }
  } catch (error) {
    throw new Error(
      "Error fetching contributors. Please check your connection."
    );
  }
};
