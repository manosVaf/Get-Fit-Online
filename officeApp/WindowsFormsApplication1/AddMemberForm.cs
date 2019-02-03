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
    public partial class AddMemberForm : Form
    {
        public AddMemberForm()
        {
            InitializeComponent();
        }

        private void label2_Click(object sender, EventArgs e)
        {

        }

        private void textBox1_TextChanged(object sender, EventArgs e)
        {

        }

        private void AddMemberForm_Load(object sender, EventArgs e)
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
            Client client = new Client();

            if (radioButton1.Checked)
            {
                client.goalId = 1;
            }else if (radioButton2.Checked)
            {
                 client.goalId = 1;
            }
            else if (radioButton3.Checked)
            {
                client.goalId = 3;
            }
            else
            {
                MessageBox.Show("Please Select a goal");
                return;
            }

            client.username = Username.Text;
            client.firstname = FirstName.Text;
            client.lastname = Lastname.Text;
            client.email = Email.Text;
            client.mobile = Mobile.Text;
            client.weight = float.Parse(Weight.Text);
            client.height = float.Parse(Height.Text);
            client.password = "ARANDOMPASS";
            DBconnector.InsertClient(client);
            this.Hide();
        }
    }
}
