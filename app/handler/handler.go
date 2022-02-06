package handler

import (
	"log"
	"net/http"

	"github.com/labstack/echo/v4"
	"marcel.works/annaquiz/app/model"
	"marcel.works/annaquiz/app/service"
)

type handler struct {
	service service.Service
}

type Handler interface {
	NewQuiz(c echo.Context) error
	GetQuiz(c echo.Context) error
	GetQuizzes(c echo.Context) error
	NewAnswers(c echo.Context) error
	GetAnswers(c echo.Context) error
	GetRandomAnswers(c echo.Context) error
}

func NewHandler() Handler {
	service := service.NewService()
	return &handler{service: service}
}

func (h *handler) NewQuiz(c echo.Context) error {
	var quiz model.Quiz
	err := c.Bind(&quiz)
	if err != nil {
		log.Println("could not deserialize quiz")
	}
	uuid, err := h.service.SaveQuiz(quiz)
	if err != nil {
		log.Print("could not save quiz")
		return c.NoContent(http.StatusInternalServerError)
	} else {
		return c.JSON(http.StatusCreated, uuid)
	}
}

func (h *handler) GetQuiz(c echo.Context) error {
	quizUuid := c.Param("uuid")
	quiz, err := h.service.GetQuiz(quizUuid)
	if err != nil {
		log.Println("could not get quiz with uuid", quizUuid)
		return c.NoContent(http.StatusNotFound)
	} else {
		return c.JSON(http.StatusOK, quiz)
	}
}

func (h *handler) GetQuizzes(c echo.Context) error {
	quizzes, err := h.service.GetAllQuizzes()
	if err != nil {
		log.Println("could not get all quizzes")
		return c.NoContent(http.StatusInternalServerError)
	} else {
		return c.JSON(http.StatusOK, quizzes)
	}
}

func (h *handler) NewAnswers(c echo.Context) error {
	quizUuid := c.Param("uuid")
	var answers []model.Answer
	err := c.Bind(&answers)
	if err != nil {
		log.Println("could not deserialize answers")
	}
	err = h.service.SaveAnswers(quizUuid, answers)
	if err != nil {
		log.Println("could not save answers")
	}
	return c.JSON(http.StatusCreated, quizUuid)
}

func (h *handler) GetAnswers(c echo.Context) error {
	quizUuid := c.Param("uuid")
	answers, err := h.service.GetAnswersByQuiz(quizUuid)
	if err != nil {
		log.Println("could not get answers for quiz with uuid", quizUuid)
		return c.NoContent(http.StatusNotFound)
	} else {
		return c.JSON(http.StatusOK, answers)
	}
}

func (h *handler) GetRandomAnswers(c echo.Context) error {
	quizUuid := c.Param("uuid")
	answers, err := h.service.GetRandomAnswersByQuiz(quizUuid)
	if err != nil {
		log.Println("could not get random answers for quiz with uuid", quizUuid)
		return c.NoContent(http.StatusNotFound)
	} else {
		return c.JSON(http.StatusOK, answers)
	}
}
