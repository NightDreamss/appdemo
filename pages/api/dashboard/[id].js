import protectAPI from "../middleware/protectAPI";
import { connect } from "../../../libs/mysqlDB";

const handler = async (req, res) => {
  const { id } = req.query;

  try {
    if (req.method === "GET") {
      try {
        const query = `SELECT customer.id, customer.name, orders.total, orders.products, orders.lat, orders.lng, orders.address, orders.createdAt FROM customer LEFT JOIN orders ON customer.id = orders.customerid WHERE userid = ? 
        AND orders.createdAt >= DATE_SUB(NOW(), INTERVAL WEEKDAY(NOW()) DAY)
        AND orders.createdAt < DATE_ADD(DATE_SUB(NOW(), INTERVAL WEEKDAY(NOW()) DAY), INTERVAL 1 WEEK)
        AND orders.status = 0`;
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
