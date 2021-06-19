/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package go.dao;

import go.util.DbConnection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Iterator;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 *
 * @author Sourabh Gautam
 */
public class ManageShopDao {

    private static PreparedStatement ps, ps1, ps2, ps3, ps4, ps6, ps7 = null;
    private static Statement st;

    static {
        try {
            ps = DbConnection.getConnection().prepareStatement("insert into shop values(?,?)");
            ps1 = DbConnection.getConnection().prepareStatement("delete  from shop where shopname = ?");
            ps2 = DbConnection.getConnection().prepareStatement("select shopname,icon from shop order by shopname asc");
            st = DbConnection.getConnection().createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
            ps3 = DbConnection.getConnection().prepareStatement("update categories set shopname = ? where shopname = ?");
            ps4 = DbConnection.getConnection().prepareStatement("insert into categories values(?,?)");
            ps6 = DbConnection.getConnection().prepareStatement("delete  from categories where category = ? and shopname = ?");
            ps7 = DbConnection.getConnection().prepareStatement("select * from categories order by category desc");

        } catch (SQLException sql) {
            sql.printStackTrace();
        }
    }

    public static JSONObject getShopsAndCategories() throws SQLException, JSONException {
        JSONObject json = new JSONObject();
        ResultSet rs = ps7.executeQuery();
        while (rs.next()) {
            json.put(rs.getString(1), rs.getString(2));
        }
        System.out.println(json);
        return json;
    }

    public static JSONObject getShops() throws SQLException, JSONException {
        JSONObject json = new JSONObject();
        ResultSet rs = ps2.executeQuery();
        while (rs.next()) {
            json.put(rs.getString(1), rs.getString(2));
        }
        rs.close();
        return json;
    }

    public static JSONObject getShopCategories() throws SQLException, JSONException {
        System.out.println("Inside getShopCategories");
        JSONObject json = new JSONObject();
        ResultSet rs = st.executeQuery("select * from categories");
        Iterator shops = getShops().keys();
        String shop = "";
        rs.next();
        while (shops.hasNext()) {
            shop = (String)shops.next();
            JSONArray arr = new JSONArray();
             do{
                if (rs.getString(2).equals(shop)) {
                    arr.put(rs.getString(1));
                }
            }while (rs.next());
            json.put(shop, arr);
            System.out.println(arr);
            rs.absolute(1);
        }
        rs.close();
        System.out.println("");
        return json;
    }

    public static boolean addShop(ArrayList<String> dataList) throws SQLException {
        StringBuffer sb = new StringBuffer();
        sb.append(dataList.get(0).toUpperCase().charAt(0));
        sb.append(dataList.get(0).toLowerCase().substring(1));
        System.out.println(sb);
        ps.setString(1, sb.toString());
        ps.setString(2, dataList.get(1));
        int result = ps.executeUpdate();
        if (result == 1) {
            return true;
        } else {
            return false;
        }
    }

    public static boolean removeShop(ArrayList<String> dataList) throws SQLException {
        ps1.setString(1, dataList.get(0));
        int result = ps1.executeUpdate();
        if (result == 1) {
            return true;
        } else {
            return false;
        }
    }

    public static boolean updateShop(ArrayList<String> dataList) throws SQLException {
        StringBuffer sb = new StringBuffer();
        sb.append(dataList.get(1).toUpperCase().charAt(0));
        sb.append(dataList.get(1).toLowerCase().substring(1));
        System.out.println(sb);
        ps.setString(1, sb.toString());
        ps.setString(2, dataList.get(2));
        ps3.setString(1, dataList.get(1));
        ps3.setString(2, dataList.get(0));
        ps1.setString(1, dataList.get(0));
        int a = ps.executeUpdate();
        int b = ps3.executeUpdate();
        int c = ps1.executeUpdate();
        System.out.println("results: " + a + " " + b + " " + c);
        if (a == 1 && b >= 0 && c == 1) {
            return true;
        } else {
            return false;
        }
    }

    public static boolean addShopCategory(ArrayList<String> dataList) throws SQLException {
        StringBuffer sb = new StringBuffer();
        sb.append(dataList.get(1).toUpperCase().charAt(0));
        sb.append(dataList.get(1).toLowerCase().substring(1));
        ps4.setString(1, sb.toString());
        ps4.setString(2, dataList.get(0));
        int result = ps4.executeUpdate();
        if (result == 1) {
            return true;
        } else {
            return false;
        }
    }

    public static boolean removeShopCategory(ArrayList<String> dataList) throws SQLException {
        ps6.setString(1, dataList.get(1));
        ps6.setString(2, dataList.get(0));
        int result = ps6.executeUpdate();
        if (result == 1) {
            return true;
        } else {
            return false;
        }
    }

    public static boolean updateShopCategory(ArrayList<String> dataList) throws SQLException {
        return false;
    }
}