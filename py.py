from tkinter import * 
from matplotlib.figure import Figure
from matplotlib.backends.backend_tkagg import (FigureCanvasTkAgg, 
NavigationToolbar2Tk)
  
# plot function is created for 
# plotting the graph in 
# tkinter window
def plot():
   
    n1 = my_entry.get()
    n2 = my_entry2.get()
    print(n1 + n2)
    # the figure that will contain the plot
    fig = Figure(figsize = (5, 5), dpi = 100) 
   
  
    # adding the subplot
    plot1 = fig.add_subplot(111)
    plot1.
    
    # plotting the graph
    plot1.plot([n1, 2, 3, 4], [n2, 4, 9, 16])
 

  
    # creating the Tkinter canvas
    # containing the Matplotlib figure
    canvas = FigureCanvasTkAgg(fig, master = window)      
  
    canvas.draw()
    
    # placing the canvas on the Tkinter window
    canvas.get_tk_widget().pack()
  
    # # creating the Matplotlib toolbar
    # toolbar = NavigationToolbar2Tk(canvas,window)
    # toolbar.update()
  
    # # placing the toolbar on the Tkinter window
    # canvas.get_tk_widget().pack()
    
  
# the main Tkinter window
window = Tk()
  
# setting the title 
window.title('Plotting in Tkinter')
  
# dimensions of the main window
window.geometry("500x500")

my_entry = Entry(window, width = 20)
my_entry.insert(0,'Username')
my_entry.pack(padx = 5, pady = 5)
 
my_entry2 = Entry(window, width = 15)
my_entry2.insert(0,'password')
my_entry2.pack(padx = 5, pady = 5)
  
# button that displays the plot
plot_button = Button(master = window, 
                     command = plot,
                     height = 2, 
                     width = 10,
                     text = "Plot")
  
# place the button 
# in main window
plot_button.pack()
  
# run the gui
window.mainloop()