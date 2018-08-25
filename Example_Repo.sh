ls
mkdir Example_Repo
cd Example_Repo
git init
touch file1.txt
git add .
git commit -m "commit 1"
touch file2.txt
git add .
git commit -m "commit 2"
echo "some content..." >> file1.txt
echo "some more content..." >> file2.txt
git commit -am "commit 3"
# Keep track of messages

# To connect to Github
git remote add origin <repo_url>
git push origin master