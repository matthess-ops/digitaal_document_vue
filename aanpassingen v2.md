CHANGES v2

Change the 3 statussen of documents that need to be signed by the user from open,signed and not_agreed. To something that beter reflect the status change. Somethigne like signing_pending , signing_agreed, signing_rejected.

Create a commom format for all axios request. Also make the request fail prove. For example when a request fails, route to an error page.

Change document to file, because not each document is a document. A zipfile is a file not a document. 

Change the wording "signed document" to something else, because it is confusing. Because signed document should reflect a document that needs user input (signing_pending , signing_agreed, signing_rejected). Now it looks like that "signed document" reflect an actuel signing_agreed document. Change to "signed document" to "to sign document"?

An huge overview was that an document can be send to multiple external people. Therefore multiple signing request for the same document are needed. Luckily through a fluke this was implemented.

In multiple views the same download functions is used, which if ofcourse redundant.

Sometimes a form submit with a submit button results in weird behavior. This can be fixed by not using form/ submit button form.

spa laravel reset password was difficult to implement. Since laravel sends a reset password link to the users email, but it doenst link to the spa frontend. Next time use a package named fortify. Which if built to use with vue frontends.

