package app

import (
	"github.com/gin-gonic/gin"
	handler2 "marcel.works/annaquiz/app/handler"
)

type app struct {
}

type App interface {
	Run()
}

func NewApp() App {
	return &app{}
}

func (a *app) Run() {
	handler := handler2.NewHandler()
	router := gin.Default()
	router.POST("/api/quiz", handler.NewQuiz)
	router.GET("/api/quiz/:uuid", handler.GetQuiz)
	router.POST("/api/quiz/:uuid/answers", handler.NewAnswers)
	router.GET("/api/quiz/:uuid/answers", handler.GetAnswers)
	router.GET("/api/quiz/:uuid/random", handler.GetRandomAnswers)
	router.Run(":8080")
}
