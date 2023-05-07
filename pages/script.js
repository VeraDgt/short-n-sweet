const profile = document.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-button');
const profileName = profile.querySelector('.profile__name');
const profileDescription = profile.querySelector('.profile__description');
const popupEditProfile = document.querySelector('#popup_edit-profile');
const popupAddCard = document.querySelector('#popup_add-card');
const popupImage = document.querySelector('#popup_image');
const formEditProfile = document.querySelector('.form-edit');

const nameInput = formEditProfile.querySelector("input[name='user-name']");
const jobInput = formEditProfile.querySelector("input[name='user-description']");

function openPopup(popup) {
  popup.classList.add('popup_opened');

};

profileEditButton.addEventListener('click', function() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(popupEditProfile);
});

// закрытие попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

const buttonsClosePopups = document.querySelectorAll('.popup__toggle');

buttonsClosePopups.forEach((item) => {
  item.addEventListener('click', function(evt) { 
    const popup = evt.target.closest('.popup');
    closePopup(popup);
    popupImage.querySelector('.popup__image').removeAttribute("src");
  });
});

formEditProfile.addEventListener('submit', handleEditProfileFormSubmit);

// обработка submit
function handleEditProfileFormSubmit(evt) {
  evt.preventDefault(); 
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(popupEditProfile);
  evt.target.reset();
  };

// добавление карточки
const cardsContainer = document.querySelector('.cards__container');
const cardAddButton = profile.querySelector('.profile__add-button');
const cardAddForm = document.querySelector('.form-add');
const cardTemplate = cardsContainer.querySelector('#card').content;
const popupImageImg = popupImage.querySelector('.popup__image');
const popupImageCaption = popupImage.querySelector('.popup__image-caption');

cardAddForm.addEventListener('submit', handleAddCardFormSubmit);

cardAddButton.addEventListener('click', function() {
  openPopup(popupAddCard);
});

const newPlaceTitle = cardAddForm.querySelector("input[name='card-title']");
const newPlaceImage = cardAddForm.querySelector("input[name='card-link']");

function createCard(link, name) {
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = newCard.querySelector('.card__image');
  const cardTitle = newCard.querySelector('.card__title');
  cardImage.src = link;
  cardImage.alt = `Вид на ${name}.`
  cardTitle.textContent = name;
  newCard.querySelector('.card__heart-icon').addEventListener('click', function(evt) {
  evt.target.classList.toggle('card__heart-icon_checked');
});
newCard.querySelector('.card__delete-button').addEventListener('click', function(evt) {
  evt.target.parentElement.remove();
});
newCard.querySelector('.card__image').addEventListener('click', function(evt) {
  popupImageImg.src = link;
  popupImageImg.alt = `Вид на ${name}.`;
  popupImageCaption.textContent = name;
  openPopup(popupImage);
});
  return newCard;
};

function addCard(newCard) {
  cardsContainer.prepend(newCard);
};

function handleAddCardFormSubmit(evt) {
  evt.preventDefault(); 
  const newPlaceImageValue = newPlaceImage.value;
  const newPlaceTitleValue = newPlaceTitle.value;
  const newCard = createCard(newPlaceImageValue, newPlaceTitleValue);
  addCard(newCard);
  closePopup(popupAddCard);
  evt.target.reset();
  };

//загрузка карточек

initialCards.forEach(function (el) {
  el.newCard = createCard(el.link, el.name);
  addCard(el.newCard);
});