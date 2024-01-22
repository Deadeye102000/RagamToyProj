
const apiUrl = 'https://api.github.com';
const perPage = 50;
let currentPage = 1;
// const fetch = require('node-fetch');
const fetchData = async (url) => {
  const response = await fetch(url);
  return response.json();
};

const getUsers = async (page) => {
  currentPage = page;
  const url = `${apiUrl}/users?per_page=${perPage}&page=${page}`;
  const users = await fetchData(url);
  displayUsers(users);
};

const searchUser = async () => {
  const username = document.getElementById('userInput').value;
  const url = `${apiUrl}/users/${username}`;
  const user = await fetchData(url);
  displayDetails(user);
};

const searchRepos = async () => {
  const username = document.getElementById('repoInput').value;
  const url = `${apiUrl}/users/${username}/repos`;
  const repos = await fetchData(url);
  displayDetails(repos);
};

const getUsersByAlphabet = async (letter) => {
  const url = `${apiUrl}/users?per_page=10&page=1&since=${letter}`;
  const users = await fetchData(url);
  displayUsers(users);
};

const displayUsers = (users) => {
  const userList = document.getElementById('userList');
  userList.innerHTML = '';

  users.forEach(user => {
    const userDiv = document.createElement('div');
    userDiv.className = 'user';
    userDiv.textContent = user.login;
    userDiv.addEventListener('click', () => showUserDetails(user.login));
    userList.appendChild(userDiv);
  });
};

const showUserDetails = async (username) => {
  const user = await fetchData(`${apiUrl}/users/${username}`);
  displayDetails(user);
};

const displayDetails = (data) => {
  const detailsDiv = document.getElementById('details');
  detailsDiv.innerHTML = JSON.stringify(data, null, 2);
};


getUsers(currentPage);
