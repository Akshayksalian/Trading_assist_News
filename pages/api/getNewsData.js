import axios from "axios";

export default async function handler(req, res) {
  try {
    const country = "in";

    // category
    // Find sources that display news of this category.
    // Possible options: businessentertainmentgeneralhealthsciencesportstechnology.
    // Default: all categories.
    const category = "business";

    // sortBy
    // The order to sort the articles in. Possible options: relevancy, popularity, publishedAt.
    // relevancy = articles more closely related to q come first.
    // popularity = articles from popular sources and publishers come first.
    // publishedAt = newest articles come first.
    const sortBy = "publishedAt";

    // pageSize
    // The number of results to return per page.
    // Default: 100. Maximum: 100.
    const pageSize = 3;

    const newsData = await axios.get(
      `https://gnews.io/api/v4/top-headlines?category=business&lang=en&max=1&apikey=94dcb6b93856c1df65411434b1f207e3`
    );


    res.status(200).json(newsData.data);
  } catch (error) {
    res.status(500).json(error);
  }
}
