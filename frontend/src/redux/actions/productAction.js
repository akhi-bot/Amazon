import axios from "axios";
import { toast } from "react-toastify";
import { getError } from "../../utils";
import {
  PRODUCT_CATEGORIES_FAIL,
  PRODUCT_CATEGORIES_REQUEST,
  PRODUCT_CATEGORIES_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_ADMIN_FAIL,
  PRODUCT_LIST_ADMIN_REQUEST,
  PRODUCT_LIST_ADMIN_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_SEARCH_FAIL,
  PRODUCT_SEARCH_REQUEST,
  PRODUCT_SEARCH_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
} from "../constants/productConstants";

export const listProducts = () => async (dispatch) => {
  dispatch({ type: PRODUCT_LIST_REQUEST });

  try {
    const { data } = await axios.get("/api/products");
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: getError(error) });
  }
};

export const productDetails = (slug) => async (dispatch) => {
  dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: slug });

  try {
    const { data } = await axios.get(`/api/products/slug/${slug}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: getError(error),
    });
  }
};
export const productDetailsById = (productId) => async (dispatch) => {
  dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });

  try {
    const { data } = await axios.get(`/api/products/${productId}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: getError(error),
    });
  }
};

export const createProduct = () => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_CREATE_REQUEST });
  const {
    userSignIn: { userInfo },
  } = getState();
  try {
    const { data } = await axios.post(
      "/api/products",
      {},
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    toast.success("product created successfully");
    dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data.product });
  } catch (error) {
    toast.error(getError(error));
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload: getError(error),
    });
  }
};

export const updateProduct = (product) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_UPDATE_REQUEST, payload: product });
  const {
    userSignIn: { userInfo },
  } = getState();
  try {
    const { data } = await axios.put(`/api/products/${product._id}`, product, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload: getError(error),
    });
  }
};

export const deleteProduct = (productId) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
  const {
    userSignIn: { userInfo },
  } = getState();
  try {
    await axios.delete(`/api/products/${productId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: PRODUCT_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: getError(error),
    });
  }
};

export const productCategories = () => async (dispatch) => {
  dispatch({ type: PRODUCT_CATEGORIES_REQUEST });

  try {
    const { data } = await axios.get("/api/products/categories");
    dispatch({ type: PRODUCT_CATEGORIES_SUCCESS, payload: data });
  } catch (error) {
    toast.error(getError(error));
    dispatch({ type: PRODUCT_CATEGORIES_FAIL, payload: getError(error) });
  }
};
export const productSearch = (searchCategoryObj) => async (dispatch) => {
  dispatch({ type: PRODUCT_SEARCH_REQUEST });
  const { page, query, category, price, rating, order } = searchCategoryObj;
  try {
    const { data } = await axios.get(
      `/api/products/search?page=${page}&query=${query}&category=${category}&price=${price}&rating=${rating}&order=${order}`
    );
    dispatch({ type: PRODUCT_SEARCH_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_SEARCH_FAIL, payload: getError(error) });
  }
};

export const productListAdmin = (page) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_LIST_ADMIN_REQUEST });
  const {
    userSignIn: { userInfo },
  } = getState();
  try {
    const { data } = await axios.get(`/api/products/admin?page=${page}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: PRODUCT_LIST_ADMIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_ADMIN_FAIL, payload: getError(error) });
  }
};
