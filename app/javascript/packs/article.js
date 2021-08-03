import $ from 'jquery'
import axios from 'modules/axios'
import { 
  listenInactiveHeartEvent,
  listenActiveHeartEvent 
} from 'modules/handle_heart'

const handleHeartDisplay = (hasLiked) => {
  if (hasLiked){
    $('.active-heart').removeClass('hidden')
  } else{
    $('.inactive-heart').removeClass('hidden')
  }
}

document.addEventListener('turbolinks:load', () => {
  const dataset = $('#article-show').data()
  const articleId = dataset.articleId

  axios.get(`/articles/${articleId}/comments`)
    .then((response) => {
      const comments = response.data
      comments.forEach((comment) => {
        $('.comments-container').append(
          `<div class="article_comment"><p>${comment.content}</p></div>`
        )
      })
    })

  axios.get(`/articles/${articleId}/like`)
    .then((response) => {
      const hasLiked = response.data.hasLiked
      handleHeartDisplay(hasLiked)
    })

    listenInactiveHeartEvent(articleId)
    listenActiveHeartEvent(articleId)
})