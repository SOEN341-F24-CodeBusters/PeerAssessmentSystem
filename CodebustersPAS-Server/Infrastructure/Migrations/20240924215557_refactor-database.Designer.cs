﻿// <auto-generated />
using System;
using Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Infrastructure.Migrations
{
    [DbContext(typeof(PeerAssessmentSystemDbContext))]
    [Migration("20240924215557_refactor-database")]
    partial class refactordatabase
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "8.0.8");

            modelBuilder.Entity("Infrastructure.Models.Group", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<Guid>("TeacherId")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("TeacherId");

                    b.ToTable("Groups");
                });

            modelBuilder.Entity("Infrastructure.Models.Team", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<Guid>("GroupId")
                        .HasColumnType("TEXT");

                    b.Property<string>("TeamName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("GroupId");

                    b.ToTable("Teams");
                });

            modelBuilder.Entity("Infrastructure.Models.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("Discriminator")
                        .IsRequired()
                        .HasMaxLength(8)
                        .HasColumnType("TEXT");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<Guid?>("GroupId")
                        .HasColumnType("TEXT");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<Guid?>("TeamId")
                        .HasColumnType("TEXT");

                    b.Property<string>("eamil")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("GroupId");

                    b.HasIndex("TeamId");

                    b.ToTable("Users");

                    b.HasDiscriminator().HasValue("User");

                    b.UseTphMappingStrategy();
                });

            modelBuilder.Entity("Infrastructure.Models.Student", b =>
                {
                    b.HasBaseType("Infrastructure.Models.User");

                    b.Property<int>("StudentID")
                        .HasColumnType("INTEGER");

                    b.HasDiscriminator().HasValue("Student");
                });

            modelBuilder.Entity("Infrastructure.Models.Teacher", b =>
                {
                    b.HasBaseType("Infrastructure.Models.User");

                    b.HasDiscriminator().HasValue("Teacher");
                });

            modelBuilder.Entity("Infrastructure.Models.Group", b =>
                {
                    b.HasOne("Infrastructure.Models.Teacher", "Teacher")
                        .WithMany()
                        .HasForeignKey("TeacherId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Teacher");
                });

            modelBuilder.Entity("Infrastructure.Models.Team", b =>
                {
                    b.HasOne("Infrastructure.Models.Group", "Group")
                        .WithMany()
                        .HasForeignKey("GroupId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Group");
                });

            modelBuilder.Entity("Infrastructure.Models.User", b =>
                {
                    b.HasOne("Infrastructure.Models.Group", null)
                        .WithMany("Students")
                        .HasForeignKey("GroupId");

                    b.HasOne("Infrastructure.Models.Team", null)
                        .WithMany("Students")
                        .HasForeignKey("TeamId");
                });

            modelBuilder.Entity("Infrastructure.Models.Group", b =>
                {
                    b.Navigation("Students");
                });

            modelBuilder.Entity("Infrastructure.Models.Team", b =>
                {
                    b.Navigation("Students");
                });
#pragma warning restore 612, 618
        }
    }
}
