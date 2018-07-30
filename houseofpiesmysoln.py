# The list of pies to print to the screen
pieList = ["Pecan", "Apple Crisp", "Bean ", "Banoffee", "Black Bun",
             "Blueberry ", "Buko", "Burek", "Tamale", "Steak"]

# Select the pie while they want to continue to order
Pecan = 0
Apple_Crisp = 0
Bean = 0
Banoffee = 0
Black_bun = 0
Blueberry = 0
Buko = 0
Burek = 0
Tamale = 0
Steak = 0 
Total_pies = 0
answer = "y"
pieCart = []



while answer == "y" :
	
		counter = 1
		i = 1

# Print out pie selections
		for x in pieList :
			print("(" + str(i) + ")" + x)
			i = i + 1

# Ask for user selection of Pie
		
		pieSelection = int(input("Please make your selection: "))
		print("Terrific!  We will have that " + str(pieList[pieSelection-1]) + " right out for you.")
#		print("Terrific!  We will have that " + str(pieList.index(pieSelection-1)) + " right out for you.")
		
		
# Tally the amount of times a pie is selected 		
		if pieSelection == 1 :
			Pecan = Pecan + 1
		elif pieSelection == 2 :
			Apple_Crisp = Apple_Crisp + 1
		elif pieSelection == 3 :
			Bean = Bean + 1
		elif pieSelection == 4 :
			Banoffee = Banoffee + 1
		elif pieSelection == 5  :
			Black_bun = Black_bun + 1
		elif pieSelection == 6 :
			Blueberry = Blueberry + 1
		elif pieSelection == 7 :
			Buko = Buko + 1
		elif pieSelection == 8  :
			Burek = Burek + 1
		elif pieSelection == 9 :
			Tamale = Tamale + 1
		elif pieSelection == 10  :
			Steak = Steak + 1
		
		Total_pies = Total_pies + 1
		answer = input("Would you like to make another order (y/n?)")

#  Print the total number of pies and amount of each
	
print("You ordered " + str(Pecan) + " Pecan pies")
print("You ordered " + str(Apple_Crisp) + " Apple Crisp pies")
print("You ordered " + str(Bean) + " Bean pies")
print("You ordered " + str(Banoffee) + " Banoffee pies")
print("You ordered " + str(Black_bun) + " Black Bun pies")
print("You ordered " + str(Blueberry) + " Blueberry pies")
print("You ordered " + str(Buko) + " Buko pies")
print("You ordered " + str(Burek) + " Burek pies")
print("You ordered " + str(Tamale) + " Tamale pies")
print("You ordered " + str(Steak) + " Steak pies")
print("You ordered a grand total of " + str(Total_pies) + " pies")
		
		