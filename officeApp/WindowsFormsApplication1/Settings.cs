using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace WindowsFormsApplication1
{
    public partial class Settings : Form
    {
        public Settings()
        {
            InitializeComponent();
        }

        private void timer1_Tick(object sender, EventArgs e)
        {
            if (checkBox1.Checked == true)
            {
                server.Text = "127.0.0.1";
                username.Text = "root";
            }
        }

        private void Settings_Load(object sender, EventArgs e)
        {

        }

        private void button1_Click(object sender, EventArgs e)
        {
            foreach (Control c in this.Controls)
            {
                if (c is TextBox)
                {
                    TextBox textBox = c as TextBox;
                    if (textBox.Text == string.Empty)
                    {
                        MessageBox.Show(textBox.Name + " is empty");
                        return;
                    }
                }
            }
            DBconnector.Connect(server.Text,username.Text,password.Text,databaseName.Text);
            if (DBconnector.isConnected())
            {
                this.Hide();
            }
            else
            {
                MessageBox.Show("No connection");
            }
        }
    }
}
