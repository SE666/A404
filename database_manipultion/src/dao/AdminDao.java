package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import po.Admin;
import po.Form;
import po.RoughForm;
import util.DBUtil;

/*
 * 管理员功能实现
 * */

public class AdminDao {
	
	// 获取管理员账号
	public Admin getAccout(String stuid, String password){
		Connection connection = DBUtil.getConn();
		String sql = "select * from user where binary stuid=? and binary password=?";
		PreparedStatement preparedStatement = null;
		ResultSet rSet = null;
		Admin admin = null;
		
		try {
			preparedStatement = connection.prepareStatement(sql);
			preparedStatement.setString(1, stuid);
			preparedStatement.setString(2, password);
			rSet = preparedStatement.executeQuery();
			if(rSet.next()){
				admin = new Admin();
				admin.setName(rSet.getString(3));
				admin.setFlag(rSet.getInt(6));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBUtil.closeRst(rSet);
			DBUtil.closePstmt(preparedStatement);
			DBUtil.closeConn(connection);
		}
		
		return admin;
	}
	
	//根据id获取姓名
	public String getName(int stuid){
		Connection connection = DBUtil.getConn();
		String sql = "select name from user where binary stuid=?";
		PreparedStatement preparedStatement = null;
		ResultSet rSet = null;
		String name = "";
		
		try {
			preparedStatement = connection.prepareStatement(sql);
			preparedStatement.setInt(1, stuid);
			rSet = preparedStatement.executeQuery();
			if(rSet.next()){
				name = rSet.getString(1);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBUtil.closeRst(rSet);
			DBUtil.closePstmt(preparedStatement);
			DBUtil.closeConn(connection);
		}
		
		return name;
	}
	
	// 获取所有申请信息
	public ArrayList<RoughForm> ShowAll(){
		Connection connection = DBUtil.getConn();
		String sql="select "
				  +"f.id id,u.name name,f.applydate applydate,f.status status"
				  +" from user u,form f where u.stuid=f.userid";
		PreparedStatement preparedStatement = null;
		ResultSet rSet = null;
		RoughForm form = null;
		ArrayList<RoughForm> list = new ArrayList<>();
		
		try {
			preparedStatement = connection.prepareStatement(sql);
			rSet = preparedStatement.executeQuery();
			while(rSet.next()){
				form = new RoughForm();
				form.setFormid(rSet.getInt(1));
				form.setName(rSet.getString(2));
				form.setApplydate(rSet.getString(3));
				form.setStatus(rSet.getString(4));
				list.add(form);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBUtil.closeRst(rSet);
			DBUtil.closePstmt(preparedStatement);
			DBUtil.closeConn(connection);
		}
		
		return list;
	}

	// 根据条件获取申请信息
	public ArrayList<RoughForm> ShowInfo(String status){
		Connection connection = DBUtil.getConn();
		String sql="select "
				  +"f.id id,u.name name,f.applydate applydate,f.status status"
				  +" from user u,form f where u.stuid=f.userid and f.status=?";
		PreparedStatement preparedStatement = null;
		ResultSet rSet = null;
		RoughForm form = null;
		ArrayList<RoughForm> list = new ArrayList<>();
		
		try {
			preparedStatement = connection.prepareStatement(sql);
			preparedStatement.setString(1, status);
			rSet = preparedStatement.executeQuery();
			while(rSet.next()){
				form = new RoughForm();
				form.setFormid(rSet.getInt(1));
				form.setName(rSet.getString(2));
				form.setApplydate(rSet.getString(3));
				form.setStatus(rSet.getString(4));
				list.add(form);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBUtil.closeRst(rSet);
			DBUtil.closePstmt(preparedStatement);
			DBUtil.closeConn(connection);
		}
		
		return list;
	}
	
	// 根据申请id显示申请详细信息
	public Form ShowForm(int id){
		Connection connection = DBUtil.getConn();
		String sql = "select * from form where id=?";
		PreparedStatement preparedStatement = null;
		ResultSet rSet = null;
		Form form = null;
		
		try {
			preparedStatement = connection.prepareStatement(sql);
			preparedStatement.setInt(1, id);;
			rSet = preparedStatement.executeQuery();
			while(rSet.next()){
				form = new Form();
				form.setId(rSet.getInt(1));
				form.setUserid(rSet.getInt(2));
				form.setApplydate(rSet.getString(3));
				form.setStart(rSet.getString(4));
				form.setEnd(rSet.getString(5));
				form.setPhone(rSet.getString(6));
				form.setNumber(rSet.getInt(7));
				form.setIfmedia(rSet.getString(8));
				form.setReason(rSet.getString(9));
				form.setName(getName(form.getUserid()));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBUtil.closeRst(rSet);
			DBUtil.closePstmt(preparedStatement);
			DBUtil.closeConn(connection);
		}
		
		return form;
	}
	
	// 修改申请状态
	public int ChangeStatus(int formid, String status){
		Connection connection = DBUtil.getConn();
		String sql = "update form set binary status=? where id=?";
		PreparedStatement preparedStatement = null;
		int result = 0;
		try {
			preparedStatement = connection.prepareStatement(sql);
			preparedStatement.setString(1, status);
			preparedStatement.setInt(2, formid);
			result = preparedStatement.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally{
			DBUtil.closePstmt(preparedStatement);
			DBUtil.closeConn(connection);
		}
		return result;
	}
	
}
