# API Documentation

If running locally, the API can be found at `localhost:8000`.

**GET** - `/courses/details/:subjectCode/:catalogNumber`

 Returns basic details about a course.

<details>
 <summary>Sample response</summary>

 ```json
{
	"data": {
		"_id": "6125db161ef9a7fe0db78317",
		"courseId": "006915",
		"associatedAcademicCareer": "UG",
		"associatedAcademicGroupCode": "MAT",
		"associatedAcademicOrgCode": "MATHDEAN",
		"subjectCode": "MATH",
		"catalogNumber": "239",
		"title": "Introduction to Combinatorics",
		"descriptionAbbreviated": "Intro to Combinatorics",
		"description": "Introduction to graph theory: colourings, matchings, connectivity, planarity. Introduction to combinatorial analysis: generating series, recurrence relations, binary strings, plane trees. [Note: Offered: F,W,S]",
		"gradingBasis": "NUM",
		"courseComponentCode": "LEC",
		"enrollConsentCode": "N",
		"enrollConsentDescription": "No Consent Required",
		"dropConsentCode": "N",
		"dropConsentDescription": "No Consent Required",
		"prerequisitesAsString": "((MATH106 with a grade of at least 70% or MATH136 or MATH146) and (MATH135 with a grade of at least 60% or MATH145)) or level at least 2A Software Engineering; Honours Mathematics students only.",
		"antirequisites": [
			{
				"subjectCode": "CO",
				"catalogNumber": "220"
			},
			{
				"subjectCode": "MATH",
				"catalogNumber": "229"
			},
			{
				"subjectCode": "MATH",
				"catalogNumber": "249"
			}
		],
		"postrequisites": [
			{
				"subjectCode": "CM",
				"catalogNumber": "339"
			},
			{
				"subjectCode": "CM",
				"catalogNumber": "441"
			},
			...
		],
		"liked": 0.7729083665338645,
		"easy": 0.25818639798488663,
		"useful": 0.8348101265822785,
		"filled_count": 502,
		"comment_count": 109,
		"__typename": "aggregate_course_rating"
	}
}
```
</details>

---

**GET** - `/course/termOfferings/:subjectCode/:catalogNumber`

Returns a list of term codes the course was offered in since 2001.

  <details>
  <summary>Sample response</summary>

  ```json
  {
    terms: ["1229", "1219", "1209", ...]
  }
  ```

  </details>

---

**GET** - `/courses/schedule/:subjectCode/:catalogNumber`

Returns the classes for the course across all terms since 2001.

Request parameters:
- `term`: The term code to get the schedule for.
If not provided, all terms are used.


<details>
<summary>Sample response</summary>

  ```json
  {
	"classes": [
		{
			"_id": "62a53c68e64962b74cb2ec4e",
			"term": "1219",
			"level": "UG",
			"dateUpdated": "2022-06-12T01:07:51.876Z",
			"subjectCode": "MATH",
			"catalogNumber": "245",
			"units": "0.5",
			"title": "Linear Algebra 2 (Adv Level)",
			"classNumber": "6161",
			"section": {
				"_id": "62a7e069a6ea312fcc2706cf",
				"type": "LEC",
				"num": "001"
			},
			"campusLocation": {
				"_id": "62a7e069a6ea312fcc2706d0",
				"first": "ONLN",
				"second": "ONLINE"
			},
			"enrolCap": 100,
			"enrolTotal": 26,
			"time": null,
			"buildingCode": "",
			"roomNumber": "",
			"instructor": "New,Stephen"
		},
    ...
	]
}
```
</details>


---
**GET** - `/professor/details/:firstName/:lastName`

Gets details about a professor.

<details>
<summary>Sample response</summary>

```json
{
	"data": {
		"name": "Brad Lushman",
		...
		"rating": {
			"liked": 0.9198858570177534,
			"clear": 0.9638364779874213,
			"engaging": 0.870253164556962,
			"filled_count": 160,
			"comment_count": 101,
			"__typename": "aggregate_prof_rating"
		}
	}
}
```
</details>

---

**GET** - `/professor/classesTaught/:firstName/:lastName`

Gets the classes taught by a professor.

Request parameters:
- `term`: The term code to get the schedule for.
If not provided, all terms are used.

<details>
<summary>Sample response</summary>

```json
  {
	"classes": [
		{
			"_id": "62a53c68e64962b74cb2ec4e",
			"term": "1219",
			"level": "UG",
			"dateUpdated": "2022-06-12T01:07:51.876Z",
			"subjectCode": "MATH",
			"catalogNumber": "245",
			"units": "0.5",
			"title": "Linear Algebra 2 (Adv Level)",
			"classNumber": "6161",
			"section": {
				"_id": "62a7e069a6ea312fcc2706cf",
				"type": "LEC",
				"num": "001"
			},
			"campusLocation": {
				"_id": "62a7e069a6ea312fcc2706d0",
				"first": "ONLN",
				"second": "ONLINE"
			},
			"enrolCap": 100,
			"enrolTotal": 26,
			"time": null,
			"buildingCode": "",
			"roomNumber": "",
			"instructor": "New,Stephen"
		},
    ...
	]
}
```
</details>

