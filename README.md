Credit Limit Tool


The data can be represented in CSV(comma separated value) form as: <br />
entity, parent, limit, utilisation
A,,100,0<br />
B,A,90,10<br />
C,B,40,20<br />
D,B,40,30<br />
E,,200,150<br />
F,E,100,80<br />

Note :  that top-level entities(A,E) have no parents so the parent column is blank.

The task is to upload a CSV file(formatted as above) from UI, process the information in the API, and produce the final output on the UI.

The output show show for each group of related entities, any examples of breaches in that group.

For Example, with the file (and graphs) above, the output should be : 

Entities : A/B/C/D:<br />
 	No limit breaches<br />

Entities : E/F:<br />
	limit breach at E (limit = 200, direct utilisation = 150, combined utilisation = 230).<br />


You will need to find a way to upload the file from UI and read the file from API, divide the three into related entities,
and then calculate the combined utilisation at each entity. Finally, the output should be displayed on the UI.

Used Depth First Search Algo approach to implement.

Setup: <br />
git clone dir <br />
run npm install for node modules <br />
run npm start<br />
View in localhost:3000<br />

Attached the working gif File<br />
![Limit Hierarchy for Limit Breach and No Limit Breach](http://g.recordit.co/pdKa6rnrL1.gif)

Working URL : <br /> https://react-credit-limit-tool.stackblitz.io/
