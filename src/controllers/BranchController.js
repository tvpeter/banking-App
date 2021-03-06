import db from '../database/models';
import Response from '../helpers/Response';

const { Branch } = db;

/** authentication controller class */
class BranchController {
  /**
   * @description - this method creates user
   *
   * @param {object} req - the request sent to the router
   * @param {object} res  - the request sent back from the controller
   * @returns {object} - object
   */
  static async create(req, res) {
    try {
      const {
        name, location, email, address,
      } = req.body;

      const { dataValues } = await Branch.create({
        name,
        location,
        email,
        address,
      });

      const response = new Response(
        true, 201, 'Branch created successfully',
        dataValues,
      );
      return res.status(response.code).json(response);
    } catch (err) {
      return res.status(500).json(new Response(false, 500, 'server error', err.errors[0].message));
    }
  }
}

export default BranchController;
