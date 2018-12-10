# The list of candies to print to the screen
candyList = ["Snickers", "Kit Kat", "Sour Patch Kids", "Juicy Fruit", "Swedish Fish",
             "Skittles", "Hershey Bar", "Lemon Drop", "Starbursts", "M&Ms"]

# The amount of candy the user will be allowed to choose
answer = "y"
while answer == "y" :
	allowance = input("How much is your allowance? ")
	counter = 1


# The list used to store all of the candies selected inside of
	candyCart = []

	while counter <= int(allowance) :

		for candy in candyList:
			print("[" + str(candyList.index(candy)) + "]" + candy)
	
		
		candysel = input("Please make your selection: ")
		candyCart.append(candyList[int(candysel)]) 
		counter = counter + 1
	
	print("I brought home with me ... ")
	print (candyCart)
	
	answer = input("Would you like to go again (y/n?) ")
