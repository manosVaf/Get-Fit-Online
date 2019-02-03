using System;
using System.Collections;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

using MySql.Data.MySqlClient;
namespace WindowsFormsApplication1
{

    public partial class Form2 : Form
    {

        public Form2()
        {
            InitializeComponent();
        }

        private void Form2_Load(object sender, EventArgs e)
        {
            if (!DBconnector.isConnected())
            {
                Settings settings = new Settings();
                settings.Show();
            }
            dataGridView1.RowHeadersVisible = false;
            //Testin
            

            //Testin
          

        }

        private void button2_Click(object sender, EventArgs e)
        {
            if (!DBconnector.isConnected())
            {
                MessageBox.Show("There is no connection");
                return;
            }

            AddMemberForm form = new AddMemberForm();
            form.Show();


        }

        private void button4_Click(object sender, EventArgs e)
        {
            if (!DBconnector.isConnected())
            {
                MessageBox.Show("There is no connection");
                return;
            }
            AddEmployeeForm form = new AddEmployeeForm();
            form.Show();
        }

        private void button5_Click(object sender, EventArgs e)
        {
            if (!DBconnector.isConnected())
            {
                MessageBox.Show("There is no connection");
                return;
            }
            AddProductForm form = new AddProductForm();
            form.Show();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            if (!DBconnector.isConnected())
            {
                MessageBox.Show("There is no connection");
                return;
            }
            dataGridView1.DataSource = fillDataGridView("Select* from client");
        }

        private void button3_Click(object sender, EventArgs e)
        {
            if (!DBconnector.isConnected())
            {
                MessageBox.Show("There is no connection");
                return;
            }
            dataGridView1.DataSource = fillDataGridView("Select* from employee");
        }

        private void button6_Click(object sender, EventArgs e)
        {
            if (!DBconnector.isConnected())
            {
                MessageBox.Show("There is no connection");
                return;
            }
            dataGridView1.DataSource = fillDataGridView("Select* from product");

        }

        private void button8_Click(object sender, EventArgs e)
        {
            CardSwipeForm form = new CardSwipeForm();
            form.Show();
        }

        private void button7_Click(object sender, EventArgs e)
        {
            if (!DBconnector.isConnected())
            {
                MessageBox.Show("There is no connection");
                return;
            }
            StatisticsForm form = new StatisticsForm();
            form.Show();
        }

        private void timer1_Tick(object sender, EventArgs e)
        {
            if (DBconnector.isConnected())
            {
                status.Text = "Connected";
                status.ForeColor = Color.Green;
            }
            else
            {
                status.Text = "Disconnected";
                status.ForeColor = Color.Red;

            }
            

        }
        private BindingSource fillDataGridView(String query)
        {
            DataTable dt = new DataTable();
            MySqlDataAdapter adapter = DBconnector.Select(query);
            adapter.Fill(dt);
            BindingSource bSource = new BindingSource();
            bSource.DataSource = dt;
            return bSource;
        }

        private void button9_Click(object sender, EventArgs e)
        {
            Settings settings = new Settings();
            settings.Show();
        }


        }

    }

