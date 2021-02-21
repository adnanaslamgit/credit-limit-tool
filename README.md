Credit Limit Tool

The number to the left of the limit represent how much of that credit limit has been ‘utilised’ or used so far.
So in the above example, C has utilised 20 of their 40 total limit, D has utilised 30 of their 40 total limit etc.

Even though B has only utilised 10 of the 90 total allocated to it, B is also responsible for the combined utilisation of it’s sub-entities so it’s 
Actual exposure is 20+30+10 = 60

Although A/B/C/D hierarchy  above has no breaches, the E/F hierarchy is a little more interesting.  Even Though neither E nor F is directly in breach, because E is also responsible for the utilisation of F, the structure as a whole is in breach. 
(80+ 150 = 230, which is greater than 200 allocated to E.

The data above can be represented in CSV(comma separated value) form as below:  entity, parent, limit, utilisation



A,,100,0
B,A,90,10
C,B,40,20
D,B,40,30
E,,200,150
F,E,100,80

Note :  that top-level entities(A,E) have no parents so the parent column is blank.

The task is to upload a CSV file(formatted as above) from UI, process the information in the API, and produce the final output on the UI.

The output show show for each group of related entities, any examples of breaches in that group.

For Example, with the file (and graphs) above, the output should be : 

Entities : A/B/C/D:
 	No limit breaches

Entities : E/F:
	limit breach at E (limit = 200, direct utilisation = 150, combined utilisation = 230).


You will need to find a way to upload the file from UI and read the file from API, divide the three into related entities,
and then calculate the combined utilisation at each entity. Finally, the output should be displayed on the UI.

Used Depth First Search Algo approach to implement.
Attached the working gif File
![Limit Hierarchy for Limit Breach and No Limit Breach](http://g.recordit.co/pdKa6rnrL1.gif)

Working URL : https://react-credit-limit-tool.stackblitz.io/
