package handler

import (
	"github.com/gin-gonic/gin"
	"log"
	"marcel.works/annaquiz/app/model"
	service2 "marcel.works/annaquiz/app/service"
)

type handler struct {
	service service2.Service
}

type Handler interface {
	NewQuiz(c *gin.Context)
	GetQuiz(c *gin.Context)
	NewAnswers(c *gin.Context)
	GetAnswers(c *gin.Context)
	GetRandomAnswers(c *gin.Context)
}

func NewHandler() Handler {
	service := service2.NewService()
	return &handler{service: service}
}

func (h *handler) NewQuiz(c *gin.Context) {
	var quiz model.Quiz
	err := c.BindJSON(&quiz)
	if err != nil {
		log.Println("could not deserialize quiz")
	}
	uuid, err := h.service.SaveQuiz(quiz)
	if err != nil {
		log.Print("could not save quiz")
		c.Status(500)
	} else {
		c.JSON(201, uuid)
	}
}

func (h *handler) GetQuiz(c *gin.Context) {
	quizUuid := c.Param("uuid")
	quiz, err := h.service.GetQuiz(quizUuid)
	if err != nil {
		log.Println("could not get quiz with uuid", quizUuid)
		c.Status(404)
	} else {
		c.JSON(200, quiz)
	}
}

func (h *handler) NewAnswers(c *gin.Context) {
	quizUuid := c.Param("uuid")
	var answers []model.Answer
	err := c.BindJSON(&answers)
	if err != nil {
		log.Println("could not deserialize answers")
	}
	err = h.service.SaveAnswers(quizUuid, answers)
	if err != nil {
		log.Println("could not save answers")
	}
	c.JSON(201, quizUuid)
}

func (h *handler) GetAnswers(c *gin.Context) {
	quizUuid := c.Param("uuid")
	answers, err := h.service.GetAnswersByQuiz(quizUuid)
	if err != nil {
		log.Println("could not get answers for quiz with uuid", quizUuid)
		c.Status(404)
	} else {
		c.JSON(200, answers)
	}
}

func (h *handler) GetRandomAnswers(c *gin.Context) {
	quizUuid := c.Param("uuid")
	answers, err := h.service.GetRandomAnswersByQuiz(quizUuid)
	if err != nil {
		log.Println("could not get random answers for quiz with uuid", quizUuid)
		c.Status(404)
	} else {
		c.JSON(200, answers)
	}
}
