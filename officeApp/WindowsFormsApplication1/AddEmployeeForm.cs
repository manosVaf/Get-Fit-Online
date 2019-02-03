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
    public partial class AddEmployeeForm : Form
    {
        public AddEmployeeForm()
        {
            InitializeComponent();
        }

        private void AddEmployeeForm_Load(object sender, EventArgs e)
        {
            dateTimePicker1.Format = DateTimePickerFormat.Custom;
            dateTimePicker1.CustomFormat = "HH:mm:ss ";
            dateTimePicker1.Value = DateTime.Now.Date;
            dateTimePicker2.Format = DateTimePickerFormat.Custom;
            dateTimePicker2.CustomFormat = "HH:mm:ss ";
            dateTimePicker2.Value = DateTime.Now.Date;

            dateTimePicker1.ShowUpDown = true;
            dateTimePicker2.ShowUpDown = true;


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
                        MessageBox.Show(textBox.Name + " is empty you idiot");
                        return;
                    }
                }
            }
            var start = dateTimePicker1.Value.TimeOfDay;
            var end = dateTimePicker1.Value.TimeOfDay;
            Employee employee = new Employee();
            employee.firstname = firstname.Text;
            employee.lastname = lastname.Text;
            employee.mobile = mobile.Text;
            employee.password = "RANDOMPASS";
            employee.Start_shift = start;
            employee.End_shift = end;
            employee.username = username.Text;
            employee.email = email.Text;

            DBconnector.InsertEmployee(employee);

           // MessageBox.Show("Auto generated Password");
            this.Hide();
        }
    }
}
