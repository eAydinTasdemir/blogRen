/* Manage Account for blog, in ex. Medium accout creat token for oublish posts   */

import Account from "../models/account.js";
import axios from "axios";
import dotenv from "dotenv";

export const createAccount = async (req, res) => {
  try {
    const { custName } = req.body;
    const newAccount = new Account({
      custName,
    });

    const savedAccount = await newAccount.save();
    res.status(201).json(savedAccount);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getAccount = async (req, res) => {
  try {
    const accounts = await Account.find();
    res.status(200).json(accounts);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};
//Medium  access_token and refresh token for call and post details
export const getMediumToken = async (req, res) => {
  try {
    const cToken = axios
      .get("https://api.medium.com", {
        code: "2e2c22ebb12dad9220f422f444096511eb90115f6a98fa60fe8d610c25612e01f",
        client_id: "df4ff66b9e66",
        client_secret: "13477b30f323202c6d9ca00cd50211f50839eb49",
        grant_type: "authorization_code",

        redirect_uri: "http://localhot:3000/callback/medium",
      })
      .then((res) => {
        res.json(res);
      })
      .catch((error) => {
        console.error(error);
      });

    //Get post ,users and atch detail, in res refresh_token and access_token
    /*
refresh_token={{refresh_token}}&client_id={{client_id}}
&client_secret={{client_secret}}&grant_type=refresh_token
*/
  } catch (error) {}
};
