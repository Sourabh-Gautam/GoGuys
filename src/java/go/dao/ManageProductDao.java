package go.dao;

import go.util.DbConnection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Map;
import org.json.JSONException;
import org.json.JSONObject;

public class ManageProductDao {

    private static PreparedStatement ps, ps1, ps2, ps3, ps4, ps5 = null;

    static {
        try {
            ps = DbConnection.getConnection().prepareStatement("insert into products values(?,?,?,?,?,?,?,?,?,?)");
            ps1 = DbConnection.getConnection().prepareStatement("delete from products where id = ?");
            ps2 = DbConnection.getConnection().prepareStatement("select * from products");
            ps3 = DbConnection.getConnection().prepareStatement("select * from products where id=?");
            ps4 = DbConnection.getConnection().prepareStatement("delete from products where shopname=? and category=? and product=?");
            ps5 = DbConnection.getConnection().prepareStatement("select * from products where product=?");

        } catch (SQLException sql) {
            sql.printStackTrace();
        }
    }

    public static JSONObject getProduct(String product) throws SQLException, JSONException {
        JSONObject json = new JSONObject();
        ps5.setString(1, product);
        ResultSet rs = ps5.executeQuery();
        if (rs.next()) {
            json.put("id", rs.getLong("id"));
            json.put("pname", rs.getString("product"));
            json.put("price", rs.getDouble("price"));
            json.put("quantity", rs.getInt("quantity"));
            json.put("shortdescription", rs.getString("shortdescription"));
            json.put("unit", rs.getString("unit"));
            json.put("shop", rs.getString("shopname"));
            json.put("category", rs.getString("category"));
            json.put("type", rs.getString("type"));
            json.put("description", rs.getString("description"));
        }else{
            json = null;
        }
        return json;
    }
    
    public static JSONObject getProduct(long id) throws SQLException, JSONException {
        JSONObject json = new JSONObject();
        ps3.setString(1, String.valueOf(id));
        ResultSet rs = ps3.executeQuery();
        if (rs.next()) {
            json.put("id", rs.getLong("id"));
            json.put("pname", rs.getString("product"));
            json.put("price", rs.getDouble("price"));
            json.put("quantity", rs.getInt("quantity"));
            json.put("shortdescription", rs.getString("shortdescription"));
            json.put("unit", rs.getString("unit"));
            json.put("shop", rs.getString("shopname"));
            json.put("category", rs.getString("category"));
            json.put("type", rs.getString("type"));
            json.put("description", rs.getString("description"));
        }else{
            json = null;
        }
        return json;
    }

    public static JSONObject getProducts() throws SQLException, JSONException {
        JSONObject json = new JSONObject();
        JSONObject innerJSON = null;
        ResultSet rs = ps2.executeQuery();
        for (int i = 1; rs.next(); i++) {
            innerJSON = new JSONObject();
            innerJSON.put("id", rs.getLong("id"));
            innerJSON.put("pname", rs.getString("product"));
            innerJSON.put("price", rs.getDouble("price"));
            innerJSON.put("quantity", rs.getInt("quantity"));
            innerJSON.put("shortdescription", rs.getString("shortdescription"));
            innerJSON.put("unit", rs.getString("unit"));
            innerJSON.put("shop", rs.getString("shopname"));
            innerJSON.put("category", rs.getString("category"));
            innerJSON.put("type", rs.getString("type"));
            innerJSON.put("description", rs.getString("description"));
            json.put(i + "", innerJSON);
        }
        return json;
    }

    public static boolean addProduct(Map<String, String> formData, long id) throws SQLException {
        ps.setLong(1, id);
        ps.setString(2, formData.get("pname"));
        ps.setDouble(3, Double.parseDouble(formData.get("price")));
        ps.setInt(4, Integer.parseInt(formData.get("quantity")));
        ps.setString(5, formData.get("short-description"));
        ps.setString(6, formData.get("unit"));
        ps.setString(7, formData.get("shops"));
        ps.setString(8, formData.get("category"));
        ps.setString(9, formData.get("type"));
        ps.setString(10, formData.get("description"));
        int result = ps.executeUpdate();
        if (result == 1) {
            return true;
        } else {
            return false;
        }
    }

    public static JSONObject removeProduct(String shop, String category, String product) throws SQLException, JSONException {
        ps4.setString(1, shop);
        ps4.setString(2, category);
        ps4.setString(3, product);
        int result = ps4.executeUpdate();
        if (result == 1) {
            return getProducts();
        }
        return null;
    }

    public static JSONObject removeProduct(long id) throws SQLException, JSONException {
        ps1.setLong(1, id);
        JSONObject json = getProduct(id);
        int result = ps1.executeUpdate();
        if (result == 1) {
            return json;
        } else {
            return null;
        }
    }
}
