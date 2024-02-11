import productService from "../service/product-service.js";

const create = async (req, res, next) => {
  try {
    const result = await productService.create(req.user, req.body);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const list = async (req, res, next) => {
  try {
    const result = await productService.list(req.user);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const request = req.body;
    request.id = productId;
    const result = await productService.update(req.user, request);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    await productService.remove(req.user, req.params.productId);
    res.status(200).json({
      data: "OK",
    });
  } catch (e) {
    next(e);
  }
};

export default { create, list, update, remove };
