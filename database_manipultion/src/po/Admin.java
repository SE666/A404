package po;

/*
 * 管理员类
 * */

public class Admin {
	int id;
	String stuid;
	String name;
	String password;
	String phone;
	int flag;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getStuid() {
		return stuid;
	}
	public void setStuid(String stuid) {
		this.stuid = stuid;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public int getFlag() {
		return flag;
	}
	public void setFlag(int flag) {
		this.flag = flag;
	}
	
	@Override
	public String toString() {
		return "Admin [id=" + id + ", stuid=" + stuid + ", name=" + name + ", password=" + password + ", phone=" + phone
				+ ", flag=" + flag + "]";
	}
	
}
