Credit Limit Tool


The data above can be represented in CSV(comma separated value) form as: entity, parent, limit, utilisation


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
