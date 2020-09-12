import {
  Subject
} from 'rxjs';
import Swal from 'sweetalert2';

export function getUsername() {
  const username = sessionStorage.getItem('username');
  let resultSj = new Subject();

  if (username) return resultSj.next(username);

  Swal.fire({
    title: 'Please enter a username',
    html: '<input id="swal-input1" class="swal2-input" required>',
    focusConfirm: false,
    preConfirm: function () {
      let newUsername = document.getElementById('swal-input1').value;
      if (!newUsername) {
        // If no username entered by user, generate random
        const randomNum = Math.floor(Math.random() * 1000)
        newUsername = 'user' + randomNum
      }

      resultSj.next(newUsername);
    }
  });

  resultSj.subscribe(x => {
    sessionStorage.setItem('username', x)
  });

  return resultSj;
}

export function addMessage(username, message) {
  document.querySelector('.messages')
    .insertAdjacentHTML(
      'beforeend',
      `<li><span>${username}: </span>${message}</li>`
    );

  window.scrollTo(0, document.body.scrollHeight);
}

export function addUser(id, username) {
  document.querySelector('.users')
    .insertAdjacentHTML(
      'beforeend',
      `<option value=${id}>${username}</option>`
    );
}

export function clearUsers() {
  document.querySelector('.users').innerHTML = '';
}

export function clearUserInput() {
  document.querySelector('.input').value = '';
}

export function removeUser(id) {
  const optionToRemove = document.querySelector(`.users option[value="${id}"]`);

  if (optionToRemove) {
    optionToRemove.parentNode.removeChild(optionToRemove);
  }
}
