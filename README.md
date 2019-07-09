[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

<p align="center">
<img width="250" alt="SeeQL Title" src="https://user-images.githubusercontent.com/46896778/60852953-00c5b980-a1c8-11e9-9c44-e5c04eff2c25.png">
</p>

---

Welcome to **QLStico(beta)**: An easy-to-use desktop application that helps you visualize your databases, tables, and data in both a GUI format as well as through the power of GraphQL.

## Getting Started

#### Requirements

MacOS, Linux, and Unix OS's are supported - all you need is Postgres installed on your machine!

#### How to Install

Beta Release 0.0.1

From the **terminal**, run:

```
git clone https://github.com/qlstico/QL.git
cd ql
yarn
yarn start

```

## Features

**Creating a Connection**

![Set Up Connection](https://user-images.githubusercontent.com/46896778/60850640-34034b00-a1be-11e9-9bef-a62221afc5f8.png)

You have the option to specify a Postgres connection you wish to create and store via the `Create Connection` button. By default, your OS' currently logged in username is prepoulated and Host field is
defaulted to `localhost`.

![Create Connection](https://user-images.githubusercontent.com/46896778/60850779-d3c0d900-a1be-11e9-8c11-97694accbdb8.png)

In most cases, unless you have password protected databases or proctected connections, this should be good enough to hit submit and connect with! Otherwise, feel free to provide the password and a different host to connect to (default port is 5432).

![Connection tile](https://user-images.githubusercontent.com/46896778/60851330-c60c5300-a1c0-11e9-97e5-ee7540e57433.png)

**Editing a Connection**

Similar to creating a connection, you always have the option to edit existing connections or remove them right from their respective tiles' buttons!

**Viewing Databases**

After establishing a valid connection, you'll see all your PG databases rendered as tiles. Double any tile to enter the database of choice!

![View All Dbs](https://user-images.githubusercontent.com/46896778/60851525-78dcb100-a1c1-11e9-8fea-3844b6641640.png)

**Adding/Deleting Databases**

You have the option of pressing the `Add A Database` button which will prompt you to provide a database name to create.

You also have the option of deleting a database by single-clicking to select it (indicated with dark grey background on tile), and the `Remove Database` will apear at the top of the page. Clicking this will delete that database.

![Add or Delete DB](https://user-images.githubusercontent.com/46896778/60851645-00c2bb00-a1c2-11e9-894d-af6fef86f4cc.png)

**Viewing Tables**

You are able to view all tables contained by a database. You may double click on any of these tiles to enter the table and see it's contents.

![All Tables](https://user-images.githubusercontent.com/46896778/60852187-97907700-a1c4-11e9-8438-a50a30c10937.png)

**Adding/Deleting Tables**

Similar to adding/deleting databases, you can add a table to the database by htting the corresponding buttons (deletion option available upon single-clicking a table to select it).

**Generating GraphQL Queries & Mutations**

At the top of the tables view, there are corresponding `GraphQL Queries` and `Visualize Schema` buttons. Clicking the `GraphQL Queries` button will open a seperate window with a PostGraphiQL IDE which represents you database tables in a GraphQL queriable format.

You can write a **GraphQL query** or **GraphQL mutation** in the lefthand input section, and once your command is complete, click **Play** button near top. If your query has any errors, an error message will display telling you exactly where the error occured.

![PostGraphiQL Window](https://user-images.githubusercontent.com/46896778/60852189-9a8b6780-a1c4-11e9-8d5c-24cc7206c218.png)

After clicking execute, you'll be able to see your results in the righthand **Results** section. Additionally, the `Docs` and `Explorer` buttons will reveal helpful information to help contruct
GraphQL queries.

**Visualizing GraphQL Schema**

Next to the `GraphQL Queries` button, the `Visualize Schema` button will open a new window that shows a visual representation of the current database's table relations. These are generated using the same GraphQL schema used for the PostGraphiQL IDE.

![Voyager Schema Visualizer](https://user-images.githubusercontent.com/46896778/60852414-9e6bb980-a1c5-11e9-9bc1-07c2534767fc.png)

**Table Contents Grid View**

Upon entering a table, a grid is generated comprised of all of it's contents. You may single click to select a row, prompting the `Remove Row` button to appear to give the option of deletion.

![Table Grid View](https://user-images.githubusercontent.com/46896778/60852582-441f2880-a1c6-11e9-82e5-1bae0064f91b.png)

Double-clicking a row sets that row into edit mode for you to modify any of the row's contents. Upon changing and item, you may hit submit to update your table with these changes. Any errors in updating will be reported back to you.

![Submission Error](https://user-images.githubusercontent.com/46896778/60852776-230b0780-a1c7-11e9-8618-6f80adbe7de7.png)

## Resources

Built on Electron, React and Postgraphile.

**Creators:** [Ricardo Pineda](http://github.com/ricardopineda93), [Jack Dwyer](https://github.com/dwyfrequency), [William Golden](https://github.com/willgolden5), [Sri Velagapudi](https://github.com/sriv97)
