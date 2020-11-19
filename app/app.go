package app

import (
	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
	"marcel.works/annaquiz/app/handler"
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
	apiHandler := handler.NewHandler()
	router := gin.Default()
	router.Use(static.Serve("/", static.LocalFile("./ui/build/", false)))
	router.POST("/api/quiz", apiHandler.NewQuiz)
	router.GET("/api/quiz", apiHandler.GetQuizzes)
	router.GET("/api/quiz/:uuid", apiHandler.GetQuiz)
	router.POST("/api/quiz/:uuid/answers", apiHandler.NewAnswers)
	router.GET("/api/quiz/:uuid/answers", apiHandler.GetAnswers)
	router.GET("/api/quiz/:uuid/random", apiHandler.GetRandomAnswers)
	router.Run(":8080")
}
