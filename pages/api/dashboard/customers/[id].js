import protectAPI from "../../middleware/protectAPI";
import { connect } from "../../../../libs/mysqlDB";

const handler = async (req, res) => {
  const { id } = req.query;

  try {
    if (req.method === "GET") {
      try {
        const query = `SELECT COUNT(*) AS customerCount FROM customer WHERE userid = ?`;
        const values = [`${id}`];
        const results = await connect({ query, values });
        return res.status(200).json(results);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    } else {
      return res
        .status(400)
        .json({ message: `HTTP method ${req.method} is not supported.` });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export default process.env.NODE_ENV === "development"
  ? handler
  : protectAPI(handler);
