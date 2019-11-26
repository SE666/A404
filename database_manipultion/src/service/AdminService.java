package service;

import java.util.ArrayList;

import dao.AdminDao;
import po.Form;
import po.RoughForm;

public class AdminService {
	AdminDao adminDao = new AdminDao();
	
	// 判断是否为管理员账号
	public int IfAccount(String stuid, String password){
		if(adminDao.getAccout(stuid, password) != null){
			return adminDao.getAccout(stuid, password).getFlag();
		}
		
		return 0;
	}
	
	// 获取所有申请信息
	public ArrayList<RoughForm> ShowAll(){
		return adminDao.ShowAll();
	}
	
	// 根据条件获取申请信息
	public ArrayList<RoughForm> ShowInfo(String status){
		return adminDao.ShowInfo(status);
	}
	
	// 显示某条申请的详细信息
	public Form ShowForm(int id){
		return adminDao.ShowForm(id);
	}
	
	// 修改申请状态
	public String ChangeStatus(int id, String status){
		if(adminDao.ChangeStatus(id, status) == 1){
			return "true";
		}
		return "false";
	}
}
