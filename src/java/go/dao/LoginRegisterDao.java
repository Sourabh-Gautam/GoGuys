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
import oracle.net.aso.r;
import org.json.JSONException;
import org.json.JSONObject;

/**
 *
 * @author Sourabh Gautam
 */
public class LoginRegisterDao {

    private static PreparedStatement ps, ps1, ps2 = null;

    static {
        try {
            ps = DbConnection.getConnection().prepareStatement("insert into nonauthenticatedusers values(?,?,?)");
            ps1 = DbConnection.getConnection().prepareStatement("insert into authenticatedusers values(?,?,?,?,?,?,?)");
            ps2 = DbConnection.getConnection().prepareStatement("select * from authenticatedusers where phone=?");
        } catch (SQLException sql) {
            sql.printStackTrace();
        }
    }

    public static void addUser(String username, String password, String phone) throws SQLException {
        ps.setString(1, username);
        ps.setString(2, password);
        ps.setString(3, "+91" + phone);
        ps.executeUpdate();
    }

    public static boolean addVerifiedUser(String username, String password, String phone) throws SQLException {
        ps1.setString(1, username);
        ps1.setString(2, password);
        ps1.setString(3, "+91" + phone);
        ps1.setString(4, null);
        ps1.setString(5, null);
        ps1.setString(6, null);
        ps1.setString(7, null);
        int r = ps1.executeUpdate();
        if (r == 1) {
            return true;
        } else {
            return false;
        }
    }

    public static JSONObject getUserByPhone(String phone) throws SQLException, JSONException {
        JSONObject json = null;
        ps2.setString(1, "+91" + phone);
        ResultSet rs = ps2.executeQuery();
        if (rs.next()) {
            json = new JSONObject();
            json.put("username", rs.getString("username"));
            json.put("password", rs.getString("password"));
            json.put("phone", rs.getString("phone"));
            json.put("email", rs.getString("email"));
            json.put("address1", rs.getString("address1"));
            json.put("address2", rs.getString("address2"));
            json.put("address3", rs.getString("address3"));
        }
        return json;
    }

    public static boolean checkAvailability(String phone) throws SQLException, JSONException {
        JSONObject json = getUserByPhone(phone);
        if (json == null) {
            return true;
        } else {
            return false;
        }
    }
}
