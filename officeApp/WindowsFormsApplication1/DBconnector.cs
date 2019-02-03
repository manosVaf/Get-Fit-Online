using System;
using System.Collections;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MySql.Data;
using MySql.Data.MySqlClient;
using System.Windows.Forms;
namespace WindowsFormsApplication1
{
    static class DBconnector
    {
        public static MySql.Data.MySqlClient.MySqlConnection conn;
        static string myConnectionString;

        public static void Connect(String server,String username,String password,String db)
        {
            myConnectionString = "server="+server+";uid="+username+";" + "pwd="+password+";database="+db+";";
            try
            {
                conn = new MySql.Data.MySqlClient.MySqlConnection();
                conn.ConnectionString = myConnectionString;
                conn.Open();
            }
            catch (MySql.Data.MySqlClient.MySqlException ex)
            {
                MessageBox.Show(ex.Message);
            }
        }

        public static void InsertClient(Client client)
        {
            MySqlCommand comm = conn.CreateCommand();
            comm.CommandText = "INSERT INTO client(Username,Password,Firstname,Lastname,Email,Mobile,Weight,Height,Goal_Goalid)"+
            "VALUES(@Username,@Password,@Firstname,@Lastname,@Email,@Mobile,@Weight,@Height,@Goalid)";

            comm.Parameters.AddWithValue("Username", client.username);
            comm.Parameters.AddWithValue("Password", client.password);
            comm.Parameters.AddWithValue("Firstname", client.firstname);
            comm.Parameters.AddWithValue("Lastname", client.lastname);
            comm.Parameters.AddWithValue("Email", client.email);
            comm.Parameters.AddWithValue("Mobile", client.mobile);
            comm.Parameters.AddWithValue("Weight", client.weight);
            comm.Parameters.AddWithValue("Height", client.height);
            comm.Parameters.AddWithValue("Goalid", client.goalId);
            comm.ExecuteNonQuery();
        }
        public static void InsertEmployee(Employee employee)
        {
            MySqlCommand comm = conn.CreateCommand();
            comm.CommandText = "INSERT INTO employee(Username,Password,Email,Firstname,Lastname,Mobile,Start_Shift,End_Shift)" +
            "VALUES(@Username,@Password,@Email,@Firstname,@lastname,@Mobile,@Start_Shift,@End_Shift)";
            comm.Parameters.AddWithValue("Username", employee.username);
            comm.Parameters.AddWithValue("Password", employee.password);
            comm.Parameters.AddWithValue("Email", employee.email);
            comm.Parameters.AddWithValue("Firstname", employee.firstname);
            comm.Parameters.AddWithValue("Lastname", employee.lastname);
            comm.Parameters.AddWithValue("Mobile", employee.mobile);
            comm.Parameters.AddWithValue("Start_Shift", employee.Start_shift);
            comm.Parameters.AddWithValue("End_Shift", employee.End_shift);
            
            comm.ExecuteNonQuery();
        }

        public static void InsertProduct(Product product)
        {
            MySqlCommand comm = conn.CreateCommand();
            comm.CommandText = "INSERT INTO product(Productid,Name,Price,Description)" +
            "VALUES(@Productid,@Name,@Price,@Description)";
            comm.Parameters.AddWithValue("Productid", product.ID);
            comm.Parameters.AddWithValue("Name", product.name);
            comm.Parameters.AddWithValue("Price", product.price);
            comm.Parameters.AddWithValue("Description", product.description);
            comm.ExecuteNonQuery();

        }


        public static MySqlDataAdapter Select(String query)
        {
            MySqlDataAdapter adapter = new MySqlDataAdapter();
            adapter.SelectCommand = new MySqlCommand(query, conn);
            return adapter;

        }

        public static ArrayList Select(String query,String param)
        {
            ArrayList list=new ArrayList();
            MySqlCommand cmd = conn.CreateCommand();
            MySqlDataReader reader;
            cmd.CommandText = query;

            reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                list.Add(reader["day"]);
            }
            reader.Close();
            return list;

        }

        public static ArrayList getExercises(String query)
        {
            ArrayList list = new ArrayList();
            MySqlCommand cmd = conn.CreateCommand();
            MySqlDataReader reader;
            cmd.CommandText = query;

            reader = cmd.ExecuteReader();
            while (reader.Read())
            {
               
                list.Add(reader["name"]);
            }
            reader.Close();

            return list;
        }

        public static Boolean exists(String name)
        {
            MySqlCommand cmd = conn.CreateCommand();
            MySqlDataReader reader;
            cmd.CommandText = "select count(*) as num from client where Username='"+name+"';";

            reader = cmd.ExecuteReader();
            reader.Read();
            if (int.Parse(reader["num"].ToString()) == 0)
            {
                reader.Close();

                return false;
            }
            reader.Close();

            return true;
        }
        

        public static Boolean isConnected()
        {
            Boolean connected = false;
            try
            {
                connected = conn.State == System.Data.ConnectionState.Open;
            }
            catch (Exception e)
            {
                return false;
            }

            return connected;
        }
       
    }
}

