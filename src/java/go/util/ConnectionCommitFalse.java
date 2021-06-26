/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package go.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 *
 * @author Sourabh Gautam
 */
public class ConnectionCommitFalse {

    private static Connection conn = null;

    static {
        try {
            Class.forName("oracle.jdbc.OracleDriver");
            System.out.println("Driver Loaded");
            conn = DriverManager.getConnection("jdbc:oracle:thin:@//sourabh-pc:1521/xe", "goguys", "goguys");
            conn.setAutoCommit(false);
            System.out.println("ConnectionAutoCommitFalse with goguys Established");
        } catch (ClassNotFoundException cnf) {
            cnf.printStackTrace();
        } catch (SQLException sql) {
            sql.printStackTrace();
        }
    }

    public static Connection getConnection() {
        return conn;
    }

    public static void closeConnection() {
        try {
            if (conn != null) {
                conn.close();
                System.out.println("Connection closed successfully!");
            }
        } catch (SQLException sql) {
            sql.printStackTrace();
        }
    }
}
