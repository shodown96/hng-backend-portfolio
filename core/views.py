from django.conf import settings
from django.shortcuts import render, Http404
from django.http import JsonResponse
from .forms import ContactForm
from django.core.mail import EmailMessage
# from django.template.loader import get_template

FROM_EMAIL = settings.FROM_EMAIL
TO_EMAIL = settings.TO_EMAIL

# Create your views here.

def index(request):
    return render(request, "core/index.html", {"form":ContactForm})

def contact(request):
    form = ContactForm
    if request.method == 'POST' :
        form = ContactForm(data=request.POST)
        if form.is_valid():
            context = form.cleaned_data
            # temp = get_template('core/contact.txt')
            # content = temp.render(context)
            body = f"Name: {context['name']}\nEmail: {context['email']}\n\nMessage:\n{context['message']}\n\nBest regards,\nHNG Porfolio."
            email = EmailMessage(
                subject='New Contact from HNG Portfolio',
                body=body,
                from_email=FROM_EMAIL,
                to=[TO_EMAIL, context['email']]
            )
            email.send()
            return JsonResponse({"message":"Thank you for reaching out, I'll get back to you soon!"})
    raise Http404("Bad Request")