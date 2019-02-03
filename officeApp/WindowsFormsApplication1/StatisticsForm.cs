using MySql.Data.MySqlClient;
using System;
using System.Collections;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Windows.Forms.DataVisualization.Charting;

namespace WindowsFormsApplication1
{
    public partial class StatisticsForm : Form
    {
        String username;
        public StatisticsForm()
        {
            InitializeComponent();
        }

        private void StatisticsForm_Load(object sender, EventArgs e)
        {
            comboBox1.Items.Add("Individually");
            comboBox1.Items.Add("Gym Stats");
            comboBox1.SelectedIndex = 0;
            chart1.Visible = false;
            chart2.Visible = false;
            chart3.Visible = false;
            chart4.Visible = false;

            label2.Text = "";
            label4.Text = "";
            label5.Text = "";

            label6.Text = ""; label7.Text = "";

        }

        private void timer1_Tick(object sender, EventArgs e)
        {
            string selected= comboBox1.GetItemText(this.comboBox1.SelectedItem);
            if (selected.Equals("Individually"))
            {
                textBox1.Visible = true;
                button1.Visible = true;
            }
            else
            {
                textBox1.Visible = false;
                button1.Visible = false;
            }

            
        }

        /// <summary>
        /// 
        /// </summary>
        private void weightStats()
        {
            chart1.Series.Clear();
            var series1 = new System.Windows.Forms.DataVisualization.Charting.Series
            {
                Name = "Series1",
                Color = System.Drawing.Color.Green,
                IsVisibleInLegend = false,
                IsXValueIndexed = true,
                ChartType = SeriesChartType.Line
            };

            this.chart1.Series.Add(series1);
            series1.Points.AddXY("20/10/2015", 50);
            series1.Points.AddXY("15/11/2015", 60);

            series1.Points.AddXY("20/1/2016", 55);

            series1.Points.AddXY("2/2/2015", 70);

         

            //for (int i = 0; i < 100; i++)
            //{
            //    series1.Points.AddXY(i, i + i);

            //}
            chart1.Invalidate();

        }

        private void button1_Click(object sender, EventArgs e)
        {
            //FETCHING DATA FROM SERVER
            //GEMIZEI TO COMBOBOX ME OLA TA DITHESIMA STATISTIKS
            username = textBox1.Text;
            if (!DBconnector.exists(username))
            {
                MessageBox.Show("User " + username + " not found");
                return;
            }

            ArrayList stats = new ArrayList();
            stats.Add("Bench press");
            stats.Add("Bicep curls");
            stats.Add("Deadlifts");
            stats.Add("Lat Pulldown");
            foreach  (String exercise in stats )
            {
                comboBox2.Items.Add(exercise);

            }
            //Visits
            String query = "select day(visitDate) as day  from visit  where Client_Username='" + username + "' and visitDate> DATE_SUB(NOW(), INTERVAL 1 WEEK ) group by day(visitDate);";
            ArrayList lst=DBconnector.Select(query, "a");
            if (lst.Count == 0)
            {
                MessageBox.Show("Error");
                label2.Text = "";
            }
            else
            {
                fillVisitsGraph(lst);
                label2.Text = textBox1.Text;
            }
            //--Visits
            query = "select distinct  Exercise.Name as name from client_exercise ,exercise where  Exercise.Exerciseid=client_exercise.Exercise_Exerciseid and Client_Username='" + username + "' order by Client_Username, Exercise_Exerciseid,Weight ;";
            lst=DBconnector.getExercises(query);
            fillFatWeight();
            comboBox2.Items.Clear();
            if (lst.Count > 0)
            {
                foreach (String exercise in lst)
                comboBox2.Items.Add(exercise);
                comboBox2.SelectedIndex = 0;
                comboBox2.Visible = true;
                chart1.Visible = true;
                label5.Text = "";


            }
            else
            {
                chart1.Visible = false;
                comboBox2.Visible = false;
                label5.Text = "DO YOU EVEN LIFT?";
                label4.Text = "";

            }


         


        }

        private void fillVisitsGraph(ArrayList lst)
        {
            chart2.Visible = true;
            chart2.Series.Clear();
            var series2 = new System.Windows.Forms.DataVisualization.Charting.Series
            {
                Name = "Series2",
                Color = System.Drawing.Color.Green,
                IsVisibleInLegend = false,
                IsXValueIndexed = true,
                ChartType = SeriesChartType.Line
            };

            this.chart2.Series.Add(series2);
            DateTime dt = DateTime.Now;
            for (int i = dt.Day - 7; i < dt.Day;i++ )
            {
                if (lst.Contains(i))
                {
                    series2.Points.AddXY(i, 1);
                }
                else
                {
                    series2.Points.AddXY(i, 0);
                }
            }


            foreach (object obj in lst)
            {
               // MessageBox.Show(obj.ToString());
                series2.Points.AddXY(obj.ToString(), 1);

                // loop body
            }
        }

        private void comboBox2_SelectedIndexChanged(object sender, EventArgs e)
        {
            String selected_exercise=comboBox2.SelectedItem.ToString();
            String query = "select weight,Date (ExerciseDate) as date from client_exercise,exercise where  Exercise.Exerciseid=client_exercise.Exercise_Exerciseid and Exercise.name='" + selected_exercise + "' and Client_Username='" + username + "' order by Date (ExerciseDate);";
            MySqlCommand cmd = DBconnector.conn.CreateCommand();
            MySqlDataReader reader;
            cmd.CommandText = query;
            double weight;
            String date;
            label4.Text = selected_exercise;
            reader = cmd.ExecuteReader();
            chart1.Series.Clear();
            var series1 = new System.Windows.Forms.DataVisualization.Charting.Series
            {
                Name = "Series1",
                Color = System.Drawing.Color.Green,
                IsVisibleInLegend = false,
                IsXValueIndexed = true,
                ChartType = SeriesChartType.Line
            };
            this.chart1.Series.Add(series1);

            while (reader.Read())
            {
                weight = double.Parse(reader["weight"].ToString());
                date = reader["date"].ToString();
                series1.Points.AddXY(date, weight);
            }
            reader.Close();
        }
        private void fillFatWeight()
        {
            String query = "select date(measure_date) as date , fat_percentage as fat from measure where Client_Username='"+username+"';";
            MySqlCommand cmd = DBconnector.conn.CreateCommand();
            MySqlDataReader reader;
            cmd.CommandText = query;
            chart3.Series.Clear();

            var series3 = new System.Windows.Forms.DataVisualization.Charting.Series
            {
                Name = "Series3",
                Color = System.Drawing.Color.Green,
                IsVisibleInLegend = false,
                IsXValueIndexed = true,
                ChartType = SeriesChartType.Line
            };
            this.chart3.Series.Add(series3);
            chart3.Visible = false;
            int i = 0;
            label6.Text = "";

            double fat;
            String date;
            reader = cmd.ExecuteReader();

            while (reader.Read())
            {
                i++;
                fat = double.Parse(reader["fat"].ToString());
                date = reader["date"].ToString();
                series3.Points.AddXY(date, fat);
                if (i > 1)
                {
                    chart3.Visible = true;
                    label6.Text = "Fat%";

                }
            }
            
            reader.Close();

            //------------------------------

            query = "select date(measure_date) as date , weight as fat from measure where Client_Username='" + username + "';";
            cmd = DBconnector.conn.CreateCommand();
            cmd.CommandText = query;
            chart4.Series.Clear();

            var series4 = new System.Windows.Forms.DataVisualization.Charting.Series
            {
                Name = "Series4",
                Color = System.Drawing.Color.Green,
                IsVisibleInLegend = false,
                IsXValueIndexed = true,
                ChartType = SeriesChartType.Line
            };
            this.chart4.Series.Add(series4);
            chart4.Visible = false;
            label7.Text = "";

            i=0;
            reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                i++;
                fat = double.Parse(reader["fat"].ToString());
                date = reader["date"].ToString();
                series4.Points.AddXY(date, fat);
                if (i > 1)
                {
                    chart4.Visible = true;
                    label7.Text = "Weight Stats";
                }

              
            }

            reader.Close();
        }


  
    }
}
