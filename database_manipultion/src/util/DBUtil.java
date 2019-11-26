package util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class DBUtil {
	private static String drivatename = null;
	private static String url = null;
	private static String username = null;
	private static String password = null;
	
	static {
		try {
			drivatename = "com.mysql.jdbc.Driver";
			url = "jdbc:mysql://localhost:3306/a404";
			username = "root";
			password = "root";
			
			//加载驱动类
			Class.forName(drivatename);
		}/* catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}*/ catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	//建立连接
	public static Connection getConn() {
		Connection conn = null;
		
		try {
			conn = DriverManager.getConnection(url, username, password);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return conn;
	}
	
	//关闭连接
	public static void closeConn(Connection conn) {
		try {
			conn.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	//关闭preparedStatement
	public static void closePstmt(PreparedStatement pstmt) {
		try {
			pstmt.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	//关闭结果集ResultSet
	public static void closeRst(ResultSet rst) {
		try {
			rst.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
