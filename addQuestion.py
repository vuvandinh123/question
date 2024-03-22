import tkinter as tk
from tkinter import ttk
import random

root = tk.Tk()
root.title("Cau hoi")
root.geometry("600x600")
root.resizable(False, False)


def submit_question():
    # Lấy nội dung câu hỏi từ ô nhập liệu
    question_text = input_question.get("1.0", tk.END).strip()
    answerTrue_text = input_answerTrue.get("1.0", tk.END).strip()
    answerFalse1_text = input_answerFalse1.get("1.0", tk.END).strip()
    answerFalse2_text = input_answerFalse2.get("1.0", tk.END).strip()
    answerFalse3_text = input_answerFalse3.get("1.0", tk.END).strip()
    f = open("./bo/dapan.txt", "a", encoding='UTF-8')
    f.write(
        f'{{"question": "{question_text}","answer":[{{"replay":"{answerTrue_text}","key":true}},{{"replay":"{answerFalse1_text}","key":false}},{{"replay":"{answerFalse2_text}","key":false}},{{"replay":"{answerFalse3_text}","key":false}}]}}')
    f.write("\n")
    f.close()
    f = open("./bo/dapan.txt", "r", encoding='UTF-8')
    a = []

    for i in f:
        a.append(i.strip("\n"))
    f.close()
    f = open("cauhoi.js", "w", encoding='UTF-8')
    f.write(f"let CauHoi={a}")
    f.close()


def reset():
    f = open("./bo/dapan.txt", "w", encoding='UTF-8')
    f.write("")
    f.close()
    f = open("cauhoi.js", "w", encoding='UTF-8')
    f.write("")
    f.close()


question = tk.Label(root, text="Nhap cau hoi:", font="Arial")
question.pack()
input_question = tk.Text(root, font="Arial", width=40, height=1)
input_question.pack()

answerTrue = tk.Label(root, text="Nhap dap an dung:", font="Arial")
answerTrue.pack()
input_answerTrue = tk.Text(root, font="Arial", width=40, height=1)
input_answerTrue.pack()
answerFalse1 = tk.Label(root, text="Nhap dap an sai:", font="Arial")
answerFalse1.pack()
input_answerFalse1 = tk.Text(root, font="Arial", width=40, height=1)
input_answerFalse1.pack()
answerFalse2 = tk.Label(root, text="Nhap dap an sai:", font="Arial")
answerFalse2.pack()
input_answerFalse2 = tk.Text(root, font="Arial", width=40, height=1)
input_answerFalse2.pack()
answerTrue = tk.Label(root, text="Nhap dap an sai:", font="Arial")
answerTrue.pack()
input_answerFalse3 = tk.Text(root, font="Arial", width=40, height=1)
input_answerFalse3.pack()


answerFalse = tk.Label(root, text="------------------------:", font="Arial")
answerFalse.pack()
submit_button = tk.Button(root, text="Submit", command=submit_question)
submit_button.pack()
reset_button = tk.Button(root, text="resest", command=reset)
reset_button.pack()
root.mainloop()
