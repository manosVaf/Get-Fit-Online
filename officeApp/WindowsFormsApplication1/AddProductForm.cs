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
    public partial class AddProductForm : Form
    {
        public AddProductForm()
        {
            InitializeComponent();
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
            Product product = new Product();
            product.name = name.Text;
            product.ID = int.Parse(productID.Text);
            product.description = description.Text;
            product.price = float.Parse(price.Text);
            DBconnector.InsertProduct(product);
            MessageBox.Show("Product Succesfully Added");
            this.Hide();

        }
    }
}
